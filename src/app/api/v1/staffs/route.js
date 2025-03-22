import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import User from "../../../backend/model/user.model";

// get all staffs
export const GET = async () => {
  connectDB();
  try {
    // get staffs from the server
    const staffs = await User.find({ role: { $ne: "Customer" } });
    if (staffs.length <= 0)
      return NextResponse.json({ error: "staff not found" });

    return NextResponse.json(
      { message: "successfully get all staffs", staffs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

// post request for staffs post | save a staffs in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log("data in staff", data);
  try {
    const newStaff = new User({
      // set every value individually
      name: data.name,
      email: data.email,
      role: data.role,
      contact: data.contact,
      joiningDate: data.joiningDate,
      image: data.image,
      password: data.password,
      status: data.status,
    });
    await newStaff.save();
    return NextResponse.json({ message: "success create staff", status: 200 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "staff already exists" });
    }
    return NextResponse.json(
      { message: "staff already exists", error },
      { status: 500 }
    );
  }
};
