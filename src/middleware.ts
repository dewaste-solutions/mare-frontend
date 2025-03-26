import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || null;

  // ✅ Define protected routes
  const protectedRoutes: { [key: string]: string } = {
    "/dashboard/admin": "admin",
    "/dashboard/franchisee": "franchisee",
    "/dashboard/worker": "worker",
    "/dashboard/manager": "manager",
    "/dashboard/community-officer": "community-officer",
  };

  const requestedPath = req.nextUrl.pathname;
  const expectedRole = protectedRoutes[requestedPath];

  console.log("🔹 Middleware Check:", { requestedPath, role, expectedRole });

  // ✅ Redirect user to login if role is missing or incorrect
  if (expectedRole && role !== expectedRole) {
    console.log("⛔ Unauthorized! Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
