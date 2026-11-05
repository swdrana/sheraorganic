import Order from "@/app/backend/model/order.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { forbidden, getApiSession, isStaff, unauthorized } from "@/app/backend/utils/apiAuth";
import { GUEST_CUSTOMER_PIPELINE, mergeGuestCustomers } from "@/app/backend/utils/guestCustomers";

// Buyers grouped by normalized phone from orders (staff only, read-only, not cached).
export const GET = async () => {
  const session = await getApiSession();
  if (!session?.user) return unauthorized();
  if (!isStaff(session)) return forbidden();

  try {
    await connectDB();
    const rows = await Order.aggregate([...GUEST_CUSTOMER_PIPELINE]);
    return NextResponse.json({ customers: mergeGuestCustomers(rows) });
  } catch (error) {
    console.error("Error fetching guest customers:", error);
    return NextResponse.json({ message: "Error fetching guest customers" }, { status: 500 });
  }
};
