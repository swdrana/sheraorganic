import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
import Product from "@/app/backend/model/product.model";
import Coupon from "@/app/backend/model/coupon.model";
import User from "@/app/backend/model/user.model";
import Setting from "@/app/backend/model/setting.model";
import Attribute from "@/app/backend/model/attributes.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/app/data/cachedData";
import { getApiSession, isStaff, unauthorized } from "@/app/backend/utils/apiAuth";
import { sendOrderConfirmation } from "@/app/backend/utils/orderEmail";
import { isEmail } from "@/app/backend/utils/mailer";
import { isValidBdPhone, normalizeBdPhone } from "@/app/utils/phone";
import {
  ALLOWED_PAYMENT_METHODS,
  shippingOptionFor,
} from "@/app/utils/orderPricing";
import crypto from "crypto";
import { isValidObjectId } from "mongoose";

const VARIANT_META_KEYS = new Set([
  "originalPrice",
  "price",
  "discount",
  "quantity",
  "inUse",
  "inUseOrder",
  "barcode",
  "volume",
  "totalVolume",
  "unit",
  "sku",
  "productId",
  "image",
  "_id",
]);

const findSelectedVariant = (product, cartLine) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const requested = cartLine?.variant;
  if (!variants.length || !requested || typeof requested !== "object") return null;

  // Option values are the identity the storefront uses for the cart line; generated productIds can repeat.
  const byOptions = variants.find((variant) => {
    const optionKeys = Object.keys(variant).filter(
      (key) => !VARIANT_META_KEYS.has(key)
    );
    return (
      optionKeys.length > 0 &&
      optionKeys.every(
        (key) => String(variant[key]) === String(requested[key])
      )
    );
  });
  if (byOptions) return byOptions;

  if (requested.productId) {
    const byProductId = variants.filter(
      (variant) => String(variant.productId) === String(requested.productId)
    );
    if (byProductId.length === 1) return byProductId[0];
  }
  return null;
};

// Product fields that are never needed on an order line (large or private-ish).
const OMITTED_PRODUCT_FIELDS = [
  "ratings",
  "description",
  "slugHistory",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "__v",
];

const productSnapshot = (product) => {
  const doc =
    typeof product?.toObject === "function" ? product.toObject() : { ...product };
  for (const key of OMITTED_PRODUCT_FIELDS) delete doc[key];
  return doc;
};

// Cart identity from the browser (react-use-cart id); the only free-form client field kept on a line.
const clientLineId = (line, product) => {
  const id = line?.id;
  if ((typeof id === "string" || typeof id === "number") && String(id).length > 0) {
    return String(id).slice(0, 200);
  }
  return String(product._id);
};

// Same label the storefront builds ("Name-Option, Option") but from DB attribute names,
// so invoices / packing lists keep showing which variant was ordered.
const variantLineName = async (product, selectedVariant) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  if (!selectedVariant || variants.length <= 1) return product.name;
  const attributeIds = Object.keys(selectedVariant).filter(
    (key) => !VARIANT_META_KEYS.has(key) && isValidObjectId(key)
  );
  if (!attributeIds.length) return product.name;
  try {
    const attributes = await Attribute.find({ _id: { $in: attributeIds } })
      .sort({ _id: -1 })
      .lean();
    const labels = (attributes || [])
      .map((attribute) =>
        attribute?.variants?.find(
          (option) => String(option?._id) === String(selectedVariant[String(attribute._id)])
        )?.name
      )
      .filter(Boolean);
    return labels.length ? `${product.name}-${labels.join(", ")}` : product.name;
  } catch {
    return product.name;
  }
};

const priceCart = async (cart) => {
  const pricedCart = [];
  let subTotal = 0;

  for (const line of cart) {
    const quantity = Number(line?.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      return { error: "পণ্যের পরিমাণ ১ থেকে ৯৯৯-এর মধ্যে হতে হবে।" };
    }

    const product = line?._id ? await Product.findById(line._id) : null;
    if (!product) return { error: "কার্টের একটি পণ্য আর পাওয়া যাচ্ছে না।" };

    const selectedVariant = findSelectedVariant(product, line);
    if (line?.variant && product.variants?.length && !selectedVariant) {
      return { error: "কার্টের পণ্যের ভ্যারিয়েন্টটি আর পাওয়া যাচ্ছে না।" };
    }

    const serverPrices = selectedVariant || product.prices;
    const price = Number(serverPrices?.price);
    if (!Number.isFinite(price) || price < 0) {
      return { error: "কার্টের একটি পণ্যের দাম সঠিক নয়।" };
    }

    const itemTotal = price * quantity;
    subTotal += itemTotal;
    // Built from the DB product only: browser-supplied name/image/isGift/extra fields are never saved.
    const snapshot = productSnapshot(product);
    delete snapshot.isGift;
    pricedCart.push({
      ...snapshot,
      _id: String(product._id),
      id: clientLineId(line, product),
      name: await variantLineName(product, selectedVariant),
      quantity,
      price,
      itemTotal,
      prices: {
        price,
        originalPrice: Number(serverPrices?.originalPrice) || price,
        discount: Number(serverPrices?.discount) || 0,
      },
      variants: Array.isArray(product.variants) ? product.variants : [],
      ...(selectedVariant ? { variant: selectedVariant } : {}),
    });
  }

  return { cart: pricedCart, subTotal };
};

const isClientTokenConflict = (error) =>
  error?.code === 11000 &&
  (Boolean(error?.keyPattern?.clientToken) ||
    (error?.keyValue && "clientToken" in error.keyValue) ||
    /clientToken/.test(String(error?.message || "")));

const existingOrderResponse = (order) =>
  NextResponse.json({ message: "order create successfully", order }, { status: 200 });

const couponDiscount = async (couponCode, subTotal) => {
  const code = typeof couponCode === "string" ? couponCode.trim() : "";
  if (!code) return 0;
  const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const coupon = await Coupon.findOne({
    couponCode: { $regex: `^${escapedCode}$`, $options: "i" },
  });
  const percentage = Number(coupon?.discountPercentage);
  const active = coupon?.endTime && new Date(coupon.endTime).getTime() > Date.now();
  if (!active || !Number.isFinite(percentage) || percentage <= 0) return 0;
  return (subTotal * percentage) / 100;
};

// get all orders (staff only: contains every customer's name, phone and address)
export const GET = async () => {
  if (!isStaff(await getApiSession())) return unauthorized();
  connectDB();
  try {
    // get orders from the server
    const orders = await Order.find();
    // console.log("orders in api", orders);
    if (orders.length <= 0)
      return NextResponse.json({ error: "order not found" });

    return NextResponse.json(
      { message: "successfully get all orders", orders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    if (
      !data?.cart?.length ||
      !data?.user_info?.name ||
      !data?.user_info?.contact ||
      !data?.user_info?.address ||
      data?.total === undefined ||
      data?.total === null
    ) {
      return NextResponse.json(
        { message: "অসম্পূর্ণ অর্ডার তথ্য" },
        { status: 400 }
      );
    }

    if (!isValidBdPhone(data.user_info.contact)) {
      return NextResponse.json(
        { message: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।" },
        { status: 400 }
      );
    }
    const userInfo = {
      ...data.user_info,
      contact: normalizeBdPhone(data.user_info.contact),
      email: isEmail(data.user_info.email) ? data.user_info.email.trim() : "",
    };
    const session = await getApiSession();
    const user = session?.user?.id || undefined;
    await connectDB();

    // Only a plain string token is used: an object here would be a query operator ({$ne: null}).
    const clientToken =
      typeof data.clientToken === "string" &&
      data.clientToken.length > 0 &&
      data.clientToken.length <= 200
        ? data.clientToken
        : undefined;

    if (clientToken) {
      const existingOrder = await Order.findOne({ clientToken }).select("+accessToken");
      if (existingOrder) return existingOrderResponse(existingOrder);
    }

    const shipping = shippingOptionFor(data.shippingOption);
    if (!shipping || Number(data.shippingCost) !== shipping.cost) {
      return NextResponse.json(
        { message: "সঠিক ডেলিভারি এলাকা নির্বাচন করুন।" },
        { status: 400 }
      );
    }
    if (!ALLOWED_PAYMENT_METHODS.includes(data.paymentMethod)) {
      return NextResponse.json(
        { message: "সঠিক পেমেন্ট পদ্ধতি নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    const priced = await priceCart(data.cart);
    if (priced.error) {
      return NextResponse.json({ message: priced.error }, { status: 400 });
    }
    const discount = await couponDiscount(data.couponCode, priced.subTotal);
    const total = priced.subTotal + shipping.cost - discount;
    if (!Number.isFinite(Number(data.total)) || Math.abs(Number(data.total) - total) > 1) {
      return NextResponse.json(
        {
          message: "পণ্যের দাম পরিবর্তন হয়েছে। কার্টে নতুন দাম বসানো হয়েছে, দেখে আবার অর্ডার করুন।",
          // Current server prices per cart line, so the browser can update its saved (stale) cart.
          currentPrices: Object.fromEntries(
            priced.cart.filter((line) => line.id).map((line) => [String(line.id), line.price])
          ),
        },
        { status: 409 }
      );
    }

    const orderCode = await getNextOrderCode();
    if (orderCode === null || orderCode === undefined) {
      return NextResponse.json(
        { message: "অর্ডার নম্বর তৈরি হয়নি। আবার চেষ্টা করুন।" },
        { status: 500 }
      );
    }

    let giftLine = null;
    let giftOwner = null;
    let pendingGift = null;
    if (user) {
      const settingDoc = await Setting.findOne({
        name: "storeCustomizationSetting",
      }).sort({ createdAt: 1 });
      const home = settingDoc?.setting?.home || {};
      const minOrder = Number(home.review_gift_min_order) || 0;
      if (home.review_gift_enabled && total >= minOrder) {
        const orderUser = await User.findById(user);
        const pending = orderUser?.pendingGifts?.find((gift) => !gift.redeemed);
        if (pending) {
          const giftProduct = await Product.findById(pending.productId);
          if (giftProduct) {
            const label = (home.review_gift_label || "🎁 রিভিউ গিফট").trim();
            giftLine = {
              _id: String(giftProduct._id),
              id: `${giftProduct._id}-gift`,
              name: `${label}: ${giftProduct.name}`,
              image: giftProduct.image || [],
              price: 0,
              prices: { price: 0, originalPrice: 0, discount: 0 },
              itemTotal: 0,
              quantity: 1,
              isGift: true,
            };
            giftOwner = orderUser;
            pendingGift = pending;
          }
        }
      }
    }
    const finalCart = giftLine ? [giftLine, ...priced.cart] : priced.cart;

    const newOrder = new Order({
      clientToken,
      accessToken: crypto.randomBytes(16).toString("hex"),
      orderCode: orderCode,
      user,
      cart: finalCart,
      user_info: userInfo,
      subTotal: priced.subTotal,
      shippingCost: shipping.cost,
      discount,
      total,
      taxes: 0,
      shippingOption: shipping.value,
      paymentMethod: data.paymentMethod,
      status: "Pending",
    });
    try {
      await newOrder.save();
    } catch (error) {
      // A simultaneous retry with the same clientToken won the unique index: return its order.
      if (clientToken && isClientTokenConflict(error)) {
        const existingOrder = await Order.findOne({ clientToken }).select("+accessToken");
        if (existingOrder) return existingOrderResponse(existingOrder);
      }
      throw error;
    }
    // Redeem the gift only once the order carrying it is really saved.
    if (giftOwner && pendingGift) {
      pendingGift.redeemed = true;
      pendingGift.redeemedOrderCode = orderCode;
      try {
        await giftOwner.save();
      } catch (error) {
        console.error("[orders] review gift redemption failed", orderCode, error?.message);
      }
    }
    revalidateTag(CACHE_TAGS.stats);
    // Customer's order email goes out in the background (never delays or fails the order).
    sendOrderConfirmation(newOrder.toObject());
    return NextResponse.json({ message: "order create successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};
