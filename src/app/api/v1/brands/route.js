import Brand from "@/app/backend/model/brands.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all attributes
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const brands = await Brand.find().sort({ _id: -1 });
    if (brands.length === 0)
      return NextResponse.json({ error: "brands not found" });

    // console.log("brands...", brands);
    return NextResponse.json({
      message: "successfully get all brands",
      brands,
    });
  } catch (error) {
    return NextResponse.json({
      message: "testing backend",
      error,
      status: 400,
    });
  }
};

// post request for attributes post | save a attributes in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log('data in category',data)
  try {
    const newBrand = new Brand({
      name: data.name,
      icon: data.icon,
      // icon:data.icon
    });
    await newBrand.save();
    return NextResponse.json({ message: "brand add success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
