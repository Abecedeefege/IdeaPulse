# Plan: IdeaPulse Spark — swipe-deck idea discovery (versions/spark)

## Goal

A second, standalone version of the IdeaPulse concept: a Tinder-style swipe deck of
business ideas. Swipe right to save, left to skip; personalized via interests, budget
and effort; saved collection, streaks and stats; shareable idea links.
Fully functional with **zero env vars, no API keys, no backend** — ideas come from a
built-in deterministic combinatorial engine, persistence is localStorage.

## Files

All under `versions/spark/` (self-contained app, own `package.json`):

- `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`,
  `postcss.config.cjs`, `index.html`, `vercel.json`, `.gitignore`, `README.md`
- `src/engine/types.ts`, `src/engine/seeds.ts`, `src/engine/generator.ts` —
  audiences × problems × models × twists combinatorial engine + ~40 curated ideas;
  `mulberry32` PRNG seeded from `hash(interests + epochDay)`; ids are
  index-encoded so any generated idea is reconstructible from its share link.
- `src/lib/storage.ts` (versioned `spark:v1` localStorage blob),
  `src/lib/share.ts` (`#i=<id>` hash links)
- `src/App.tsx` (view state machine: onboarding | deck | saved | stats) +
  `src/components/` (Deck with hand-rolled pointer-event swipe, IdeaCard,
  ActionBar, FilterSheet, SavedList, StatsPanel, tab bar, toast)

## Stack

Vite 6 + React 18.3 + TypeScript + Tailwind v3.4. No router, no animation lib,
no other runtime deps. Hash-fragment share links mean no SPA rewrites are needed.

## Root-repo impact

One line in root `tsconfig.json`: `"exclude": ["node_modules", "versions"]` —
prevents the root Next build's typecheck from sweeping `versions/`.
No other root file is touched; root `npm run build` must stay green.

## Risks / edge cases

- Tailwind v4 drift → pinned `tailwindcss@^3.4.17`, hand-written configs.
- Hydration/date logic → none (pure SPA); streak day-math handled in storage layer.
- localStorage corruption → try/catch parse, merge with schema defaults.

## Verification

1. `cd versions/spark && npm install && npm run build` (= `tsc --noEmit && vite build`)
2. `npm run preview -- --port 4173` → curl `/` returns 200 with app markup
3. Root regression: `npm run build` at repo root still passes
4. Deployed to Vercel as a static Vite app (no env vars)
