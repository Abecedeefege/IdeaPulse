import { audiences, curatedIdeas, models, problems, twists } from "./seeds";
import type { FullIdea, Industry, Profile } from "./types";

// ─── Deterministic randomness ──────────────────────────────────────────────────

/** Small, fast, seedable PRNG. Returns a function yielding floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a string hash → 32-bit unsigned int. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function epochDay(now: number = Date.now()): number {
  return Math.floor(now / 86_400_000);
}

/** Personal + fresh-daily + deterministic deck seed. */
export function sessionSeed(interests: Industry[], day: number = epochDay()): number {
  const key = [...interests].sort().join(",") + ":" + day;
  return hashString(key);
}

// ─── Composition ───────────────────────────────────────────────────────────────

const SMALL_WORDS = new Set([
  "a", "an", "the", "for", "of", "and", "or", "in", "on", "to", "with",
  "over", "under", "per", "at", "by", "that", "who",
]);

/** Title-case that respects small words, symbols ($29/mo) and existing caps (SaaS, AI). */
export function smartTitleCase(s: string): string {
  return s
    .split(" ")
    .map((word, i) => {
      if (!/^[a-z]/.test(word)) return word; // "$29/mo", "SaaS", "AI-powered", "HOA"
      if (i > 0 && SMALL_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function pickIndustry(audIdx: number, probIdx: number): Industry {
  const aud = audiences[audIdx];
  const prob = problems[probIdx];
  const shared = aud.industries.find((ind) => prob.industries.includes(ind));
  return shared ?? aud.industries[0];
}

/**
 * Pure function from seed indices → idea. Used by both the generator and
 * `decodeIdeaId`, so any generated idea is reconstructible from its id alone.
 * `twistIdx` is -1 for "no twist".
 */
export function composeIdea(
  audIdx: number,
  probIdx: number,
  modelIdx: number,
  twistIdx: number
): FullIdea {
  const aud = audiences[audIdx];
  const prob = problems[probIdx];
  const model = models[modelIdx];
  const twist = twistIdx >= 0 ? twists[twistIdx] : null;

  const id =
    "g-" +
    [audIdx, probIdx, modelIdx, twistIdx + 1].map((n) => n.toString(36)).join(".");

  // Deterministic flavor picks derived from the id itself.
  const flavor = mulberry32(hashString(id));
  const r1 = Math.floor(flavor() * model.rationales.length);
  let r2 = Math.floor(flavor() * (model.rationales.length - 1));
  if (r2 >= r1) r2 += 1;
  const stepIdx = Math.floor(flavor() * model.firstSteps.length);

  return {
    id,
    title: smartTitleCase(`${model.label} for ${aud.label}`),
    hook: `For ${aud.label} who ${prob.label}${twist ? ", " + twist : ""}.`,
    whyItWorks: `${model.rationales[r1]} ${model.rationales[r2]}`,
    firstStep: model.firstSteps[stepIdx],
    industry: pickIndustry(audIdx, probIdx),
    budgetTier: model.budgetTier,
    effortTier: model.effortTier,
  };
}

// ─── Generation ────────────────────────────────────────────────────────────────

function pickFrom<T>(rng: () => number, pool: T[]): T {
  return pool[Math.floor(rng() * pool.length)];
}

export function generateIdea(rng: () => number, profile: Profile): FullIdea {
  const interests = profile.interests;

  // Audience matching selected interests (or any if none selected).
  let audPool = interests.length
    ? audiences.filter((a) => a.industries.some((i) => interests.includes(i)))
    : audiences;
  if (audPool.length === 0) audPool = audiences;
  const aud = pickFrom(rng, audPool);
  const audIdx = audiences.indexOf(aud);

  // Industry-compatible problem.
  let probPool = problems.filter((p) =>
    p.industries.some((i) => aud.industries.includes(i))
  );
  if (probPool.length === 0) probPool = problems;
  const prob = pickFrom(rng, probPool);
  const probIdx = problems.indexOf(prob);

  // Model respecting budget/effort filters (0 = any; tier N allows ≤ N).
  let modelPool = models.filter(
    (m) =>
      (profile.budgetTier === 0 || m.budgetTier <= profile.budgetTier) &&
      (profile.effortTier === 0 || m.effortTier <= profile.effortTier)
  );
  if (modelPool.length === 0) modelPool = models;
  const model = pickFrom(rng, modelPool);
  const modelIdx = models.indexOf(model);

  // 60% chance of a twist.
  const twistIdx = rng() < 0.6 ? Math.floor(rng() * twists.length) : -1;

  return composeIdea(audIdx, probIdx, modelIdx, twistIdx);
}

/** Reconstruct any idea (generated or curated) from its id. */
export function decodeIdeaId(id: string): FullIdea | null {
  if (!id) return null;
  if (id.startsWith("c-")) {
    return curatedIdeas.find((c) => c.id === id) ?? null;
  }
  if (!id.startsWith("g-")) return null;
  const parts = id.slice(2).split(".");
  if (parts.length !== 4) return null;
  const nums = parts.map((p) => parseInt(p, 36));
  if (nums.some((n) => Number.isNaN(n) || n < 0)) return null;
  const [audIdx, probIdx, modelIdx, twistPlus1] = nums;
  if (audIdx >= audiences.length || probIdx >= problems.length) return null;
  if (modelIdx >= models.length || twistPlus1 > twists.length) return null;
  return composeIdea(audIdx, probIdx, modelIdx, twistPlus1 - 1);
}

function curatedPoolFor(profile: Profile, rng: () => number): FullIdea[] {
  let pool = curatedIdeas.filter(
    (c) =>
      (profile.interests.length === 0 || profile.interests.includes(c.industry)) &&
      (profile.budgetTier === 0 || c.budgetTier <= profile.budgetTier) &&
      (profile.effortTier === 0 || c.effortTier <= profile.effortTier)
  );
  if (pool.length === 0) {
    pool = curatedIdeas.filter(
      (c) => profile.interests.length === 0 || profile.interests.includes(c.industry)
    );
  }
  if (pool.length === 0) pool = [...curatedIdeas];
  // Deterministic Fisher–Yates shuffle.
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deterministic idea stream: interleaves ~1 curated idea per 4 generated,
 * skips anything in `excludeIds`, and replays identically for the same
 * profile + day (the stream restarts each call; previously surfaced ids
 * are excluded by the caller).
 */
export function nextIdeas(
  count: number,
  profile: Profile,
  excludeIds: Iterable<string>
): FullIdea[] {
  const exclude = new Set(excludeIds);
  const seed = sessionSeed(profile.interests);
  const rng = mulberry32(seed);
  const curated = curatedPoolFor(profile, mulberry32(seed ^ 0x9e3779b9));

  const out: FullIdea[] = [];
  const emitted = new Set<string>();
  let position = 0;
  let attempts = 0;
  const MAX_ATTEMPTS = 4000;

  while (out.length < count && attempts < MAX_ATTEMPTS) {
    attempts++;
    position++;
    const candidate =
      position % 5 === 0
        ? curated[Math.floor(position / 5 - 1) % curated.length]
        : generateIdea(rng, profile);
    if (exclude.has(candidate.id) || emitted.has(candidate.id)) continue;
    emitted.add(candidate.id);
    out.push(candidate);
  }
  return out;
}
