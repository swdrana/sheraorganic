import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
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
    if (data?.clientToken) {
      const existingOrder = await Order.findOne({ clientToken: data.clientToken });
      if (existingOrder) {
        return NextResponse.json({ message: "order create successfully", order: existingOrder }, { status: 200 });
      }
    }
    const orderCode = await getNextOrderCode();
    // console.log("orderCode..", orderCode);

    const newOrder = new Order({
      clientToken: data.clientToken,
      orderCode: orderCode,
      user: data.user,
      cart: data.cart,
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
    return NextResponse.json({ message: "error", error });
  }
};
