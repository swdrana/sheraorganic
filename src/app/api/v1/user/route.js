import User from "@/app/backend/model/user.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  connectDB();
  const email = await req.json();
  //   console.log("product data", data);
  try {
    const user = await User.findOne({ email: email });
    // console.log("user in router.js", user);
    if (user) {
      return NextResponse.json({ message: "success", user });
    } else {
      return NextResponse.json({ error: "user not found" });
    }
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};

// get all user
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const users = await User.find({ role: "Customer" }).sort({ _id: -1 });
    // const users = await User.find().sort({ _id: -1 });
    // console.log("users..", users);

    if (users?.length <= 0)
      return NextResponse.json({ error: "users not found" }, { status: 404 });

    return NextResponse.json(
      { message: "successfully get all users", users },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in users route", error);
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};
