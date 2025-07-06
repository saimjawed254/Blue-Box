import { redis } from "./redis";
import { Ratelimit } from "@upstash/ratelimit";

export function createRateLimiter(limit: number, duration: `${number} ${"s" | "m" | "h"}`) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(limit, duration),
    analytics: true,
    prefix: "@ratelimit",
  });
}
