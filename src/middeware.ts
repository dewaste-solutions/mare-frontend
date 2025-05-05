import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define public paths that don't require authentication
const publicPaths = ['/login', '/api/auth'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for public paths
  if (publicPaths.some(pp => path.startsWith(pp))) {
    return NextResponse.next();
  }
  
  // Check for token in cookies (from refresh token) or authorization header
  const token = request.cookies.get('refreshToken')?.value || 
                request.headers.get('authorization')?.split(' ')[1];
  
  // If no token, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }
  
  try {
    // Basic structure verification (not full validation)
    // Full validation happens on the backend
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    console.error('Auth middleware error:', error);
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};