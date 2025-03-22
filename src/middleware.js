import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Allow requests if the token exists or for public paths
  if (token || pathname === "/login") {
    return NextResponse.next();
  }

  // Redirect to login if the user is not authenticated
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout", "/admin/:path*", "/my-account"],
};
