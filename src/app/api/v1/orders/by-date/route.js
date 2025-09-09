import Order from "@/app/backend/model/order.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// Get orders by date
export const GET = async (req) => {
  connectDB();
  
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Create date range for the selected date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Find orders within the date range
    const orders = await Order.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      { 
        message: "Successfully fetched orders by date", 
        orders,
        count: orders.length,
        date: date
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: error.message },
      { status: 500 }
    );
  }
};