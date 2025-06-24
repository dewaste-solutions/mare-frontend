import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get("refreshToken");
	const isLoginPage = request.nextUrl.pathname === "/login";
	const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

	// If trying to access login page with valid token, redirect to dashboard
	if (isLoginPage && refreshToken) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// If trying to access dashboard without token, redirect to login
	if (isDashboardPage && !refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/dashboard/:path*"],
};
