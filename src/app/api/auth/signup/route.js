// app/api/auth/signup/route.js

import User from "@/app/backend/model/user.model";
import connectDB from "@/app/utils/database";

import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password } = await req.json();
  // console.log("name", name);

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  connectDB();

  try {
    const user = await new User({ name, email, password: password });
    // console.log("user............", user);
    await user.save();
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    // console.log("error in signup router", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "user already exists" });
    }
    return NextResponse.json(
      { message: "user already exists", error },
      { status: 500 }
    );
  }
}
