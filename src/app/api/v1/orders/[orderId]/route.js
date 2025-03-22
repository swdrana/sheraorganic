import Order from "@/app/backend/model/order.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

//===== Delete single order by id =========
export const DELETE = async ({ params }) => {
  connectDB();
  try {
    const { orderId } = params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "order deleted successfully",
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(`Deleting Error: ${error.message}`));
  }
};

// ======== update single order  ============
export async function PATCH(req, { params }) {
  connectDB();

  const { orderId } = params;
  const updateOrderStatus = await req.json(); // Get the status from request body
  // console.log("update status", updateOrderData, id);
  try {
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: { status: updateOrderStatus } }
    );

    if (result.nModified === 0) {
      return NextResponse.json(
        { message: "Order not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Order Updated Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//======== single order details =========
export const GET = async ({ params }) => {
  // console.log("hit get in signle blog details");

  connectDB();
  try {
    const { orderId } = params;
    const orderDetails = await Order.findOne({ _id: orderId });
    if (!orderDetails) {
      return NextResponse.json(
        { error: "orderDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ orderDetails: orderDetails }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`orderDetails Error: ${error.message}`));
  }
};
