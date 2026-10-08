import User from "@/app/backend/model/user.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { getApiSession, isStaff, unauthorized } from "@/app/backend/utils/apiAuth";

// lookup by email (staff only: returns a customer's contact details)
export const POST = async (req) => {
  if (!isStaff(await getApiSession())) return unauthorized();
  connectDB();
  const email = await req.json();
  //   console.log("product data", data);
  try {
    const user = await User.findOne({ email: email }).select("-password");
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

// get all user (staff only; never returns passwords)
export const GET = async () => {
  if (!isStaff(await getApiSession())) return unauthorized();
  connectDB();
  try {
    const users = await User.find({ role: "Customer" }).select("-password").sort({ _id: -1 });
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
