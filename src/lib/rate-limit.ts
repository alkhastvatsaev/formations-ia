/**
 * In-memory sliding-window rate limiter for serverless-friendly V1.
 * Replace with Redis/Upstash when traffic requires multi-instance consistency.
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs = 60_000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= limit) {
    const retryAfterSec = Math.ceil((recent[0]! + windowMs - now) / 1000);
    hits.set(key, recent);
    return { ok: false, retryAfterSec };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
