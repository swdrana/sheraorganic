import Coupon from "@/app/backend/model/coupon.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all coupons
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const coupons = await Coupon.find();
    if (coupons.length <= 0)
      return NextResponse.json({ error: "coupon not found" });

    return NextResponse.json(
      { message: "successfully get all coupon", coupons },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

// post request for coupons post | save a coupons in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  try {
    const newCoupon = new Coupon({
      // set every value individually
      title: data.title,
      couponCode: data.couponCode,
      discountPercentage: data.discountPercentage,
      endTime: data.endTime,
      bannerImage: data.bannerImage,
      status: data.status,
    });
    await newCoupon.save();
    return NextResponse.json({
      message: "New coupon create success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
