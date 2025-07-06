import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createRateLimiter } from "./src/lib/limiter"; // your Upstash logic

export default clerkMiddleware(async (auth, req) => {
  const ua = req.headers.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  if (isMobile && !req.nextUrl.pathname.startsWith("/mobile-blocked")) {
    console.log("Blocking mobile user → redirecting");
    return NextResponse.redirect(new URL("/mobile-blocked", req.url));
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // most accurate
    req.headers.get("x-real-ip") || // sometimes set by proxies
    "anonymous"; // fallback

  const limiter = createRateLimiter(30, "60 s");
  const { success } = await limiter.limit(ip);

  if (!success && !req.nextUrl.pathname.startsWith("/rate-limit")) {
    console.log("Rate limit exceeded → redirecting");
    return NextResponse.redirect(new URL("/rate-limit", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.well-known|api/auth|mobile-blocked|rate-limit).*)",
  ],
};
