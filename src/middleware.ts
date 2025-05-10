import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/api/auth/sign-in',
  '/api/auth/sign-out'
];

// Define static routes (assets, etc.)
const staticRoutes = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/api'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static routes
  if (staticRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Allow access to public routes without authentication
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check for authentication cookie
  const sessionCookie = request.cookies.get('__session');
  
  // If no session cookie is present, redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    // Save the original URL to redirect back after login
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }
  
  // User has session cookie, proceed
  return NextResponse.next();
}

// Configure the middleware to run on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (/api/*)
     * - Next.js static files (_next/*)
     * - Other static assets
     */
    '/((?!_next/|images/|favicon.ico).*)',
  ],
}; 