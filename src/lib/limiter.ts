import { redis } from "./redis";
import { Ratelimit } from "@upstash/ratelimit";

export const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "120 s"),
  analytics: true,
  prefix: "@ratelimit",
});
