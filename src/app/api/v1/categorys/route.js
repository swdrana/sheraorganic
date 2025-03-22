import Category from "@/app/backend/model/category.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all categorys
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const categorys = await Category.find().sort({ _id: -1 });
    if (categorys.length <= 0)
      return NextResponse.json({ error: "categorys not found" });

    return NextResponse.json({
      message: "successfully get all categorys",
      categorys,
    });
  } catch (error) {
    return NextResponse.json({
      message: "testing backend",
      error,
      status: 400,
    });
  }
};

// post request for categorys post | save a categorys in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log("data in category", data);
  try {
    const newCategory = new Category({
      // set every value individually
      name: data.name,
      description: data.description,
      parentId: data.parentId,
      parentName: data.parentName,
      status: data.status,
      icon: data.icon,
    });
    await newCategory.save();
    return NextResponse.json({ message: "Category add success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
