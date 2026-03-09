/**
 * Abuse protection utilities — honeypot, rate limiting, duplicate prevention.
 * Migration-friendly: no platform-specific dependencies.
 */

/* ═══ Honeypot ═══ */

/** Field name used as honeypot — bots auto-fill it, real users don't see it */
export const HONEYPOT_FIELD = "website_url";

/** Returns true if the honeypot field was filled (likely a bot) */
export function isHoneypotTriggered(formData: Record<string, unknown>): boolean {
  const value = formData[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

/* ═══ Client-side rate limiting ═══ */

const submitTimestamps: Map<string, number[]> = new Map();

interface RateLimitOptions {
  /** Max submissions allowed in the window */
  maxAttempts: number;
  /** Time window in milliseconds */
  windowMs: number;
}

const DEFAULTS: RateLimitOptions = { maxAttempts: 3, windowMs: 60_000 };

/**
 * Check if a form action is rate-limited.
 * @param key - Unique identifier for the form (e.g. "inquiry", "contact", "sign-in")
 * @returns true if the action should be blocked
 */
export function isRateLimited(key: string, opts: Partial<RateLimitOptions> = {}): boolean {
  const { maxAttempts, windowMs } = { ...DEFAULTS, ...opts };
  const now = Date.now();
  const timestamps = (submitTimestamps.get(key) ?? []).filter((t) => now - t < windowMs);
  submitTimestamps.set(key, timestamps);
  return timestamps.length >= maxAttempts;
}

/** Record a form submission for rate-limiting purposes */
export function recordSubmission(key: string): void {
  const now = Date.now();
  const timestamps = submitTimestamps.get(key) ?? [];
  timestamps.push(now);
  submitTimestamps.set(key, timestamps);
}

/* ═══ Timing-based bot detection ═══ */

/**
 * Returns true if the form was submitted suspiciously fast (likely a bot).
 * @param mountedAt - timestamp (Date.now()) when the form was rendered
 * @param minMs - minimum milliseconds a human would need (default 2s)
 */
export function isTooFast(mountedAt: number, minMs = 2000): boolean {
  return Date.now() - mountedAt < minMs;
}
