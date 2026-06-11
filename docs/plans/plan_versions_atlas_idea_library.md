# Plan: IdeaPulse Atlas — editorial idea library (versions/atlas)

## Goal

A second, standalone version of the IdeaPulse concept: an editorial/magazine-style
library of 90 hand-curated business ideas (10 categories × 9), each with a
pre-written mini-analysis (market, monetization, first steps, risks, who it's for) —
IdeaPulse's "deep analysis" feature, pre-computed and SEO-ready.
Fully functional with **zero env vars, no API keys, no DB** — pure static export.

## Files

All under `versions/atlas/` (self-contained app, own `package.json`):

- `package.json`, `next.config.ts` (`output: "export"`, `trailingSlash: true`,
  `images.unoptimized`), `tsconfig.json`, `tailwind.config.ts`,
  `postcss.config.mjs`, `.gitignore`, `README.md`
- `src/data/types.ts`, `src/data/categories.ts`, `src/data/collections.ts`,
  `src/data/ideas/<category>.ts` (10 files × 9 ideas),
  `src/data/ideas/index.ts` (aggregates; throws on duplicate slug at build time)
- `src/app/`: `layout.tsx`, `page.tsx` (hero, Idea of the Day, categories, featured),
  `ideas/page.tsx` (browse + client-side search/filters via `useState`,
  no `useSearchParams`), `ideas/[slug]/page.tsx` (`generateStaticParams` +
  `generateMetadata`, 90 SEO pages), `categories/[slug]/page.tsx`,
  `collections/page.tsx`, `about/page.tsx`, `sitemap.ts`, `robots.ts`, `icon.svg`
- `src/components/`: Header, Footer, IdeaCard, Explorer (client), IdeaOfTheDay
  (client, date computed in `useEffect` to avoid hydration mismatch), badges/pills

## Stack

Next.js 15.0.7 static export + React 18.3 + Tailwind v3.4 (the exact combo proven
by the root app). System serif font stack — no `next/font/google` (no build-time
network fetch).

## Root-repo impact

Shares the one-line root `tsconfig.json` exclude with the Spark plan; nothing else.

## Risks / edge cases

- `useSearchParams` breaks static export → not used; filters are local state.
- Idea-of-the-Day frozen at build time → computed client-side post-mount.
- Dataset integrity → slug-uniqueness assertion throws during `next build`.

## Verification

1. `cd versions/atlas && npm install && npm run build` → emits `out/`
2. `out/index.html`, `out/ideas/<slug>/index.html`, category pages and
   `out/sitemap.xml` exist with expected content
3. Serve `out/` and curl `/` + one detail page (200 + content)
4. Root regression: `npm run build` at repo root still passes
5. Deployed to Vercel as a static export (no env vars)
