import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const ua = req.headers.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  if (isMobile && !req.nextUrl.pathname.startsWith("/mobile-blocked")) {
    console.log("Blocking mobile user → redirecting");
    return NextResponse.redirect(new URL("/mobile-blocked", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|mobile-blocked).*)",
  ],
};
