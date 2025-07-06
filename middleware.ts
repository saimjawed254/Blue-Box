import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createRateLimiter } from "./src/lib/limiter";

export default clerkMiddleware(async (auth, req) => {
  const ua = req.headers.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  if (isMobile && !req.nextUrl.pathname.startsWith("/mobile-blocked")) {
    console.log("Blocking mobile user → redirecting");
    return NextResponse.redirect(new URL("/mobile-blocked", req.url));
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
    req.headers.get("x-real-ip") || 
    "anonymous";

  const limiter = createRateLimiter(120, "60 s");
  const { success } = await limiter.limit(ip);

  if (!success && !req.nextUrl.pathname.startsWith("/ratelimit")) {
    console.log("Rate limit exceeded → redirecting");
    return NextResponse.redirect(new URL("/ratelimit", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.well-known|api/auth|mobile-blocked).*)",
  ],
};