import Order from "@/app/backend/model/order.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { getApiSession, canAccessUser, unauthorized } from "@/app/backend/utils/apiAuth";

// Get signle user details
export const GET = async (req, { params }) => {
  // console.log("hit get in signle blog details");
  //   console.log("params...", params);
  const { id } = params;
  if (!canAccessUser(await getApiSession(), id)) return unauthorized();
  connectDB();
  try {
    const userOrder = await Order.find({ user: id });

    // console.log("product details in api route", productDetails);
    if (!userOrder) {
      return NextResponse.json(
        { error: "userOrder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ userOrder: userOrder }, { status: 200 });
  } catch (error) {
    console.log("error in get single user userOrder by id", error);
    return new Response(JSON.stringify(`userOrder Error: ${error.message}`));
  }
};
