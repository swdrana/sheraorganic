import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const STAFF_ROLES = Object.freeze([
  "Admin",
  "CEO",
  "Manager",
  "Super Admin",
  "Accountant",
]);

export const isStaffRole = (role) => STAFF_ROLES.includes(role);

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // /admin is restricted to the explicit staff allow-list; /my-account needs any signed-in user.
  const isAdminPath = pathname.startsWith("/admin");
  const allowed = isAdminPath
    ? isStaffRole(token?.role)
    : !!token;

  if (allowed || pathname === "/login") {
    return NextResponse.next();
  }

  // A signed-in customer hitting /admin goes home instead of looping through /login.
  if (isAdminPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to login if the user is not authenticated
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/my-account"],
};
