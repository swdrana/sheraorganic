import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
import Product from "@/app/backend/model/product.model";
import User from "@/app/backend/model/user.model";
import Setting from "@/app/backend/model/setting.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/app/data/cachedData";
import { getApiSession, isStaff, unauthorized } from "@/app/backend/utils/apiAuth";
import { sendOrderConfirmation } from "@/app/backend/utils/orderEmail";
import { isEmail } from "@/app/backend/utils/mailer";
import { isValidBdPhone, normalizeBdPhone } from "@/app/utils/phone";

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

    if (data?.clientToken) {
      const existingOrder = await Order.findOne({ clientToken: data.clientToken });
      if (existingOrder) {
        return NextResponse.json({ message: "order create successfully", order: existingOrder }, { status: 200 });
      }
    }
    const orderCode = await getNextOrderCode();
    if (orderCode === null || orderCode === undefined) {
      return NextResponse.json(
        { message: "অর্ডার নম্বর তৈরি হয়নি। আবার চেষ্টা করুন।" },
        { status: 500 }
      );
    }

    let giftLine = null;
    if (user) {
      const settingDoc = await Setting.findOne({
        name: "storeCustomizationSetting",
      }).sort({ createdAt: 1 });
      const home = settingDoc?.setting?.home || {};
      const minOrder = Number(home.review_gift_min_order) || 0;
      if (home.review_gift_enabled && Number(data.total) >= minOrder) {
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
              quantity: 1,
              isGift: true,
            };
            pending.redeemed = true;
            pending.redeemedOrderCode = orderCode;
            await orderUser.save();
          }
        }
      }
    }
    const finalCart = giftLine ? [giftLine, ...data.cart] : data.cart;

    const newOrder = new Order({
      clientToken: data.clientToken,
      orderCode: orderCode,
      user,
      cart: finalCart,
      user_info: userInfo,
      subTotal: data.subTotal,
      shippingCost: data.shippingCost,
      discount: data.discount,
      total: data.total,
      taxes: data.taxes,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: data.status,
    });
    await newOrder.save();
    revalidateTag(CACHE_TAGS.stats);
    // Customer's order email goes out in the background (never delays or fails the order).
    sendOrderConfirmation(newOrder.toObject());
    return NextResponse.json({ message: "order create successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};
