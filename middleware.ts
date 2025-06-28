import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/', // add other public routes if needed
]);

export default clerkMiddleware((auth, req) => {
  const ua = req.headers.get('user-agent') || '';

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  // You can restrict only public-facing routes or all routes
  if (isMobile) {
    console.log('Blocking mobile user → redirecting');
    return NextResponse.redirect(new URL('/mobile-blocked', req.url));
  }

  // Let Clerk handle the rest (auth, sessions, etc.)
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|mobile-blocked).*)', // ❗ excludes static + the block page
    '/(api|trpc)(.*)',
    '/',
  ],
};