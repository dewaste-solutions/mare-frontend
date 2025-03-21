import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define Public Routes
const PUBLIC_ROUTES = ["/", "/login", "/signup"];

// Define Private Routes (Dynamically restrict `/dashboard/{role}` and `/application/{role}`)
const PRIVATE_PATHS = [
  /^\/dashboard(\/.*)?$/, // Matches `/dashboard` and `/dashboard/{role}`
  /^\/application\/(admin|franchisee|worker|manager|community)$/, // Strict match for `/application/{role}`
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userCookie = req.cookies.get("user");

  console.log(`🔍 Checking Route: ${pathname}`);
  console.log(`👤 User Found? ${userCookie ? "YES" : "NO"}`);

  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  // Check if the route is private
  const isPrivateRoute = PRIVATE_PATHS.some((pattern) => pattern.test(pathname));

  console.log(`🚦 Public Route? ${isPublicRoute}`);
  console.log(`🚦 Private Route? ${isPrivateRoute}`);

  // If the user is not logged in and tries to access a private route, redirect to login
  if (!userCookie && isPrivateRoute) {
    console.log("🚨 Unauthorized! Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is logged in and tries to access a public route, redirect to their dashboard
  if (userCookie && isPublicRoute) {
    try {
      const user = JSON.parse(userCookie.value);
      console.log(`🔄 Redirecting to /dashboard/${user.role}`);
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url));
    } catch (error) {
      console.error("❌ Error parsing user cookie:", error);
      // If the cookie is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("user");
      return response;
    }
  }

  // Allow access to the requested route
  console.log("✅ Access Allowed");
  return NextResponse.next();
}

// Ensure middleware applies to all pages except system files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};