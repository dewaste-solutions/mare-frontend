import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || null;
  const requestedPath = req.nextUrl.pathname;

  console.log("🔹 Middleware Check:", { requestedPath, role });

  if (!role) {
    console.log("⛔ No role found! Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Admins can access /dashboard/admin
  if (requestedPath.startsWith("/dashboard/admin")) {
    if (role !== "admin") {
      console.log("⛔ Unauthorized! Only admin can access this page.");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next(); // Admin allowed
  }

  // ✅ Allow all other roles to access /dashboard
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
