import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If the path is the root path, redirect to the home page
  if (path === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Continue with the request for all other paths
  return NextResponse.next();
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: ['/']
};