import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
import Product from "@/app/backend/model/product.model";
import User from "@/app/backend/model/user.model";
import Setting from "@/app/backend/model/setting.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all orders
export const GET = async () => {
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
  connectDB();
  const data = await req.json();
  // console.log("product data", data);
  try {
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

    if (data?.clientToken) {
      const existingOrder = await Order.findOne({ clientToken: data.clientToken });
      if (existingOrder) {
        return NextResponse.json({ message: "order create successfully", order: existingOrder }, { status: 200 });
      }
    }
    const orderCode = await getNextOrderCode();
    // console.log("orderCode..", orderCode);

    let giftLine = null;
    if (data.user) {
      const settingDoc = await Setting.findOne({
        name: "storeCustomizationSetting",
      }).sort({ createdAt: 1 });
      const home = settingDoc?.setting?.home || {};
      const minOrder = Number(home.review_gift_min_order) || 0;
      if (home.review_gift_enabled && Number(data.total) >= minOrder) {
        const user = await User.findById(data.user);
        const pending = user?.pendingGifts?.find((gift) => !gift.redeemed);
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
            await user.save();
          }
        }
      }
    }
    const finalCart = giftLine ? [giftLine, ...data.cart] : data.cart;

    const newOrder = new Order({
      clientToken: data.clientToken,
      orderCode: orderCode,
      user: data.user || undefined,
      cart: finalCart,
      user_info: data.user_info,
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
    return NextResponse.json({ message: "order create successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};
