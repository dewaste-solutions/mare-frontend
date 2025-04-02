import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const role = request.cookies.get("userRole")?.value; // Get user role from cookies

  // Redirect unauthorized users to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Define access control for each role
  const roleAccess: { [key: string]: string[] } = {
    admin: ["/dashboard/admin"],
    manager: ["/dashboard/manager"],
    franchisee: ["/dashboard/franchisee"],
    worker: ["/dashboard/worker"],
    "community-officer": ["/dashboard/community-officer"],
  };

  // Restrict access based on role
  const requestedPath = request.nextUrl.pathname;
  if (role && !roleAccess[role]?.some((path) => requestedPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Protect dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
