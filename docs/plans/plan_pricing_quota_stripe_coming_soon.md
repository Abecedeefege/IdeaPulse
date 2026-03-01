# Plan: Pricing CTAs, quota 100, Stripe "Coming soon"

## Target state

- **Pricing CTAs:** Free tier CTA → log in then dashboard. Pro/Team CTAs → log in then Stripe (for paid plans).
- **While building:** Treat all visits as logged in (keep BYPASS_AUTH); Stripe links show "Coming soon"; idea quota = 100.

## Changes

### 1. Pricing page ([src/app/pricing/page.tsx](../../src/app/pricing/page.tsx))

- **Free:** CTA can go to `/dashboard` or `/onboarding` (dashboard for "get started" when bypass is on).
- **Pro and Team:** Change href from `/onboarding` to a "coming soon" behavior: use `#` or a button that shows "Coming soon" (e.g. button text "Coming soon" and no navigation, or link to `/coming-soon`). No external Stripe URL until integration; all paid CTAs show "Coming soon".

### 2. Idea quota = 100

- In [src/app/api/similar-ideas/route.ts](../../src/app/api/similar-ideas/route.ts): change `SIMILAR_IDEAS_DAILY_LIMIT` from 10 to 100 (or read from `process.env.RATE_LIMIT_IDEAS_PER_DAY`).
- In [src/lib/env.ts](../../src/lib/env.ts): change default for `RATE_LIMIT_IDEAS_PER_DAY` from 10 to 100.

### 3. All visits = logged in

- Already achieved when `BYPASS_AUTH=1` is set in Vercel; no code change.
- Document in SETUP.md that for "build mode" set BYPASS_AUTH so all sections work and users get recommendations.

## Revert

Restore SIMILAR_IDEAS_DAILY_LIMIT and RATE_LIMIT_IDEAS_PER_DAY to 10; restore Pro/Team links to onboarding or future Stripe URLs; remove "Coming soon" when Stripe is ready.
