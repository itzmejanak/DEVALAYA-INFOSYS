import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Redirect root path to /home
  if (path === '/') {
    return Response.redirect(new URL('/home', request.url));
  }
}

export const config = {
  matcher: ['/']
};
