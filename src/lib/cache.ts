import { redis } from "./redis";

export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 60
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    console.log(`🟢 Cache HIT for key: ${key}`);
    return cached as T;
  }
  console.log(`🔴 Cache MISS for key: ${key} → fetching from DB`);
  const fresh = await fetcher();
  await redis.set(key, fresh, { ex: ttlSeconds });
  return fresh;
}