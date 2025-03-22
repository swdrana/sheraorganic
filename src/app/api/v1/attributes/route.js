import Attribute from "@/app/backend/model/attributes.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all attributes
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const attributes = await Attribute.find().sort({ _id: -1 });
    if (attributes.length === 0)
      return NextResponse.json({ error: "attributes not found" });

    return NextResponse.json({
      message: "successfully get all attributes",
      attributes,
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
    const newAttribute = new Attribute({
      // set every value individually
      title: data.title,
      name: data.name,
      option: data.option,
      variants: data.variants,
      // icon:data.icon
    });
    await newAttribute.save();
    return NextResponse.json({ message: "Attribute add success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
