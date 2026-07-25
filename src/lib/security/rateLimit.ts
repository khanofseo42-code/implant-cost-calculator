import type { NextRequest } from "next/server";

/**
 * In-memory token-bucket rate limiter. Adequate for a single-instance
 * deployment; on multi-instance/serverless hosting this resets per instance
 * and should be swapped for a shared store (e.g. Upstash Redis) in production.
 */
interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();

const CAPACITY = 20;
const REFILL_PER_MS = 20 / (60 * 1000); // 20 requests per minute

export function checkRateLimit(req: NextRequest, scope: string): { allowed: boolean } {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();

  const bucket = buckets.get(key) ?? { tokens: CAPACITY, lastRefill: now };
  const elapsed = now - bucket.lastRefill;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + elapsed * REFILL_PER_MS);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return { allowed: false };
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { allowed: true };
}
