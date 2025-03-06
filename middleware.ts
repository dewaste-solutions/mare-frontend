import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("user"); // Check if user exists
  const protectedRoutes = ["/dashboard"];

  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login
  }

  if (user && ["/", "/signup"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to dashboard
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/dashboard"],
};
