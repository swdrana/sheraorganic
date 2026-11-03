import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const STAFF_ROLES = Object.freeze([
  "Admin",
  "CEO",
  "Manager",
  "Super Admin",
  "Accountant",
]);

// Keep this explicit allow-list aligned with middleware.js.
export const isStaff = (session) =>
  STAFF_ROLES.includes(session?.user?.role);

export const getApiSession = () => getServerSession(authOptions);

export const requireStaff = async () => {
  const session = await getApiSession();
  if (!isStaff(session)) throw new Error("Unauthorized");
  return session;
};

// The user themself or staff may read/update a user's private data.
export const canAccessUser = (session, userId) =>
  isStaff(session) || (!!session?.user?.id && String(session.user.id) === String(userId));

export const requireUserAccess = async (userId) => {
  const session = await getApiSession();
  if (!canAccessUser(session, userId)) throw new Error("Unauthorized");
  return session;
};

export const unauthorized = () =>
  NextResponse.json({ message: "Unauthorized" }, { status: 401 });

// Only the store owners may assign or change account roles.
export const canManageRoles = (session) =>
  ["Admin", "CEO"].includes(session?.user?.role);

export const forbidden = () =>
  NextResponse.json({ message: "Forbidden" }, { status: 403 });
