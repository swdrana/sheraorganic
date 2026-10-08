import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Staff = any signed-in non-customer role (Admin, CEO, Manager, …); same rule as middleware.js.
export const isStaff = (session) =>
  !!session?.user?.role && session.user.role !== "Customer";

export const getApiSession = () => getServerSession(authOptions);

// The user themself or staff may read/update a user's private data.
export const canAccessUser = (session, userId) =>
  isStaff(session) || (!!session?.user?.id && String(session.user.id) === String(userId));

export const unauthorized = () =>
  NextResponse.json({ message: "Unauthorized" }, { status: 401 });
