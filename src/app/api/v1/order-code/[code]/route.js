import Order from "@/app/backend/model/order.model";
import { getApiSession, isStaff } from "@/app/backend/utils/apiAuth";
import connectDB from "@/app/utils/database";
import crypto from "crypto";
import { NextResponse } from "next/server";

const tokenMatches = (provided, saved) => {
  if (typeof provided !== "string" || typeof saved !== "string" || !saved) {
    return false;
  }
  const providedBuffer = Buffer.from(provided);
  const savedBuffer = Buffer.from(saved);
  return (
    providedBuffer.length === savedBuffer.length &&
    crypto.timingSafeEqual(providedBuffer, savedBuffer)
  );
};

const withoutAccessToken = (order) => {
  const safeOrder =
    typeof order?.toObject === "function" ? order.toObject() : { ...order };
  delete safeOrder.accessToken;
  return safeOrder;
};

// Get a single order only for staff, its signed-in owner, or its private invoice token.
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { code } = params;
    const singleOrder = await Order.findOne({ orderCode: code }).select(
      "+accessToken"
    );
    if (!singleOrder) {
      return NextResponse.json({ message: "অর্ডারটি পাওয়া যায়নি।" }, { status: 404 });
    }

    const session = await getApiSession();
    const token = new URL(req.url).searchParams.get("t");
    const owner =
      !!session?.user?.id && String(singleOrder.user) === String(session.user.id);
    if (!isStaff(session) && !owner && !tokenMatches(token, singleOrder.accessToken)) {
      return NextResponse.json({ message: "অর্ডারটি পাওয়া যায়নি।" }, { status: 404 });
    }

    return NextResponse.json(
      { singleOrder: withoutAccessToken(singleOrder) },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in get singleOrder using code", error);
    return NextResponse.json({ message: "অর্ডারটি পাওয়া যায়নি।" }, { status: 404 });
  }
};
