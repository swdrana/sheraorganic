import Order from "@/app/backend/model/order.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// Get signle user details
export const GET = async (req, { params }) => {
  // console.log("hit get in signle blog details");
  //   console.log("params...", params);
  connectDB();
  try {
    const { code } = params;
    // console.log("user id..", id);
    const singleOrder = await Order.findOne({ orderCode: code });

    // console.log("product details in api route", productDetails);
    if (!singleOrder) {
      return NextResponse.json(
        { error: "singleOrder not found " },
        { status: 404 }
      );
    }
    return NextResponse.json({ singleOrder: singleOrder }, { status: 200 });
  } catch (error) {
    console.log("error in get singleOrder using code", error);
    return new Response(JSON.stringify(`userOrder Error: ${error.message}`));
  }
};
