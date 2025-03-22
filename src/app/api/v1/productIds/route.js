import Product from "@/app/backend/model/product.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  connectDB();
  const ids = await req.json();
  // console.log("product ids", ids);
  try {
    if (!ids || ids.length === 0) {
      return NextResponse.json({ message: "No product IDs provided" });
    }

    const products = await Product.find({ _id: { $in: ids } });
    // console.log("products..in productsids route", products);

    return NextResponse.json({ message: "success", products });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
