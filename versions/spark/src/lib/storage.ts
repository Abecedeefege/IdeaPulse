import type { FullIdea, Industry, Profile } from "../engine/types";

const STORAGE_KEY = "spark:v1";
const SEEN_CAP = 500;

export type SavedEntry = { id: string; idea: FullIdea; savedAt: number };

export type Stats = {
  seen: number;
  liked: number;
  skipped: number;
  streak: number;
  bestStreak: number;
  lastActiveDay: string; // local "YYYY-MM-DD", "" if never active
};

export type SparkState = {
  v: 1;
  profile: Profile;
  saved: SavedEntry[];
  seenIds: string[]; // FIFO, capped at SEEN_CAP
  stats: Stats;
  onboarded: boolean;
};

export function defaultState(): SparkState {
  return {
    v: 1,
    profile: { interests: [], budgetTier: 0, effortTier: 0 },
    saved: [],
    seenIds: [],
    stats: { seen: 0, liked: 0, skipped: 0, streak: 0, bestStreak: 0, lastActiveDay: "" },
    onboarded: false,
  };
}

export function localDayKey(d: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Streak rule, applied on each action: first action today continues the streak
 * if the last active day was yesterday, restarts it at 1 if older, and keeps
 * everything unchanged if already active today.
 */
export function touchStreak(stats: Stats, now: Date = new Date()): Stats {
  const today = localDayKey(now);
  if (stats.lastActiveDay === today) return stats;
  const yesterday = localDayKey(new Date(now.getTime() - 86_400_000));
  const streak = stats.lastActiveDay === yesterday ? stats.streak + 1 : 1;
  return {
    ...stats,
    streak,
    bestStreak: Math.max(streak, stats.bestStreak),
    lastActiveDay: today,
  };
}

/**
 * Streak to display right now: the stored streak is only alive if the user
 * was active today or yesterday; otherwise it has lapsed back to 0.
 */
export function currentStreak(stats: Stats, now: Date = new Date()): number {
  const today = localDayKey(now);
  const yesterday = localDayKey(new Date(now.getTime() - 86_400_000));
  return stats.lastActiveDay === today || stats.lastActiveDay === yesterday
    ? stats.streak
    : 0;
}

const VALID_TIERS = [0, 1, 2, 3];

function sanitize(raw: unknown): SparkState {
  const def = defaultState();
  if (typeof raw !== "object" || raw === null) return def;
  const r = raw as Record<string, unknown>;
  const profile = (r.profile ?? {}) as Record<string, unknown>;
  const stats = (r.stats ?? {}) as Record<string, unknown>;

  const num = (v: unknown, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) ? v : fallback;

  return {
    v: 1,
    profile: {
      interests: Array.isArray(profile.interests)
        ? (profile.interests.filter((i) => typeof i === "string") as Industry[])
        : def.profile.interests,
      budgetTier: VALID_TIERS.includes(profile.budgetTier as number)
        ? (profile.budgetTier as Profile["budgetTier"])
        : 0,
      effortTier: VALID_TIERS.includes(profile.effortTier as number)
        ? (profile.effortTier as Profile["effortTier"])
        : 0,
    },
    saved: Array.isArray(r.saved)
      ? (r.saved as SavedEntry[]).filter(
          (s) => s && typeof s.id === "string" && s.idea && typeof s.idea.title === "string"
        )
      : [],
    seenIds: Array.isArray(r.seenIds)
      ? (r.seenIds.filter((i) => typeof i === "string") as string[]).slice(-SEEN_CAP)
      : [],
    stats: {
      seen: num(stats.seen, 0),
      liked: num(stats.liked, 0),
      skipped: num(stats.skipped, 0),
      streak: num(stats.streak, 0),
      bestStreak: num(stats.bestStreak, 0),
      lastActiveDay: typeof stats.lastActiveDay === "string" ? stats.lastActiveDay : "",
    },
    onboarded: r.onboarded === true,
  };
}

export function loadState(): SparkState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return sanitize(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function saveState(state: SparkState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — the app keeps working in-memory.
  }
}

/** Append an id to seenIds with FIFO cap. */
export function pushSeen(seenIds: string[], id: string): string[] {
  if (seenIds[seenIds.length - 1] === id) return seenIds;
  const next = [...seenIds, id];
  return next.length > SEEN_CAP ? next.slice(next.length - SEEN_CAP) : next;
}
