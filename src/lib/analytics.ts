import { Redis } from "@upstash/redis";
import { parseUA } from "./ua-parser";

/**
 * Redis-backed visit analytics.
 *
 * Data model (keeps footprint tiny):
 *   analytics:total   → INCR counter, all-time visits (survives list trimming)
 *   analytics:events  → LIST of JSON events, newest first, trimmed to MAX_EVENTS
 *
 * Every aggregation (top pages, countries, devices, time series, …) is derived
 * from the recent-events list at read time, so there is only one list to trim
 * and no fan-out of per-dimension counter keys to keep in sync.
 */

const MAX_EVENTS = 5000;
const TOTAL_KEY = "analytics:total";
const EVENTS_KEY = "analytics:events";

export interface VisitEvent {
  t: number; // timestamp (ms)
  ip: string;
  country: string;
  city: string;
  path: string;
  browser: string;
  os: string;
  device: "mobile" | "tablet" | "desktop";
  referrer: string; // hostname of referrer, or "Direct"
}

let client: Redis | null = null;

/**
 * Lazily build the Redis client from env vars. Supports both the Upstash names
 * and the Vercel KV integration names. Returns null when unconfigured so the
 * app degrades gracefully (e.g. local dev without Redis).
 */
export function getRedis(): Redis | null {
  if (client) return client;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    "";

  if (!url || !token) return null;

  client = new Redis({ url, token });
  return client;
}

/** Reduce a referrer URL to a hostname, collapsing same-site + empty to "Direct". */
function referrerHost(referrer: string, selfHost: string): string {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host || host === selfHost.replace(/^www\./, "")) return "Direct";
    return host;
  } catch {
    return "Direct";
  }
}

/**
 * Record a single visit. Safe to call fire-and-forget from middleware —
 * swallows its own errors so analytics never breaks a page load.
 */
export async function recordVisit(input: {
  ip: string;
  country: string;
  city: string;
  path: string;
  userAgent: string;
  referrer: string;
  selfHost: string;
  now: number;
}): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const { browser, os, device } = parseUA(input.userAgent);

  const event: VisitEvent = {
    t: input.now,
    ip: input.ip,
    country: input.country,
    city: input.city,
    path: input.path,
    browser,
    os,
    device,
    referrer: referrerHost(input.referrer, input.selfHost),
  };

  try {
    const pipe = redis.pipeline();
    pipe.incr(TOTAL_KEY);
    pipe.lpush(EVENTS_KEY, JSON.stringify(event));
    pipe.ltrim(EVENTS_KEY, 0, MAX_EVENTS - 1);
    await pipe.exec();
  } catch (err) {
    console.error("[analytics] recordVisit failed:", err);
  }
}

// ---- Aggregation (read side) -------------------------------------------------

/** Strip a trailing version number so "Chrome 120.0" groups as "Chrome". */
function family(label: string): string {
  return label.replace(/\s[\d._]+$/, "").trim() || label;
}

function tally(items: string[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const it of items) {
    map.set(it, (map.get(it) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export interface VisitorRow {
  ip: string;
  country: string;
  city: string;
  count: number;
  last: number;
}

export interface StatsResult {
  totalVisits: number; // all-time counter
  sampleSize: number; // number of events in the recent window
  uniqueVisitors: number;
  topPages: { label: string; count: number }[];
  countries: { label: string; count: number }[];
  browsers: { label: string; count: number }[];
  os: { label: string; count: number }[];
  devices: { label: string; count: number }[];
  referrers: { label: string; count: number }[];
  visitors: VisitorRow[];
  timeSeries: { date: string; count: number }[]; // per-day, ascending
  recentEvents: VisitEvent[]; // newest 50 for the live feed
}

/** Read the recent-events window and compute every dashboard aggregation. */
export async function getStats(): Promise<StatsResult | null> {
  const redis = getRedis();
  if (!redis) return null;

  const [total, raw] = await Promise.all([
    redis.get<number>(TOTAL_KEY),
    redis.lrange<VisitEvent | string>(EVENTS_KEY, 0, MAX_EVENTS - 1),
  ]);

  // Upstash auto-deserializes JSON; guard for both object and string rows.
  const events: VisitEvent[] = (raw ?? [])
    .map((r) => (typeof r === "string" ? safeParse(r) : (r as VisitEvent)))
    .filter((e): e is VisitEvent => !!e && typeof e.t === "number");

  // Unique visitors keyed by IP, with rollup for the visitor table.
  const byIp = new Map<string, VisitorRow>();
  for (const e of events) {
    const row = byIp.get(e.ip);
    if (row) {
      row.count += 1;
      if (e.t > row.last) row.last = e.t;
    } else {
      byIp.set(e.ip, {
        ip: e.ip,
        country: e.country,
        city: e.city,
        count: 1,
        last: e.t,
      });
    }
  }

  // Per-day time series bucketed by Vietnam time (UTC+7), ascending.
  const dayMap = new Map<string, number>();
  for (const e of events) {
    const day = vnDay(e.t);
    dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
  }
  const timeSeries = [...dayMap.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalVisits: total ?? events.length,
    sampleSize: events.length,
    uniqueVisitors: byIp.size,
    topPages: tally(events.map((e) => e.path)),
    countries: tally(events.map((e) => e.country || "-")),
    browsers: tally(events.map((e) => family(e.browser))),
    os: tally(events.map((e) => family(e.os))),
    devices: tally(events.map((e) => e.device)),
    referrers: tally(events.map((e) => e.referrer)),
    visitors: [...byIp.values()].sort((a, b) => b.last - a.last),
    timeSeries,
    recentEvents: events.slice(0, 50),
  };
}

function safeParse(s: string): VisitEvent | null {
  try {
    return JSON.parse(s) as VisitEvent;
  } catch {
    return null;
  }
}

/** YYYY-MM-DD for a timestamp, bucketed in Vietnam time (UTC+7). */
function vnDay(ms: number): string {
  // Shift the epoch by +7h, then read the UTC calendar date of the shifted time.
  return new Date(ms + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
