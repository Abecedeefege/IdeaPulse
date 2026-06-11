# IdeaPulse Atlas

The editorial edition of IdeaPulse: a browsable, magazine-style field guide of
**90 hand-curated business ideas** across 10 categories, each with a pre-written
mini-analysis — market, monetization, first steps, risks, and who it's for.
Fully static, SEO-ready, and zero-backend.

## Stack

- Next.js 15 (App Router, `output: "export"` — pure static export)
- React 18, TypeScript
- Tailwind CSS v3
- No env vars, no API keys, no database, no webfonts (system font stacks only)

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev server at http://localhost:3000
npm run build   # static export to ./out
npx serve out   # serve the exported site locally
```

## Structure

- `src/data/types.ts` — `AtlasIdea` and friends
- `src/data/ideas/<category>.ts` — 9 ideas per category (90 total); `index.ts`
  concatenates them and throws at build time on duplicate slugs
- `src/data/categories.ts`, `src/data/collections.ts` — the 10 categories and
  5 curated collections
- `src/app/` — routes: `/`, `/ideas`, `/ideas/[slug]`, `/categories/[slug]`,
  `/collections`, `/about`, plus `sitemap.ts` and `robots.ts`

## Deployment

Deploys anywhere static files are served. On Vercel:

1. Import the repo, set the **Root Directory** to `versions/atlas`.
2. Framework preset: **Next.js** (the static export is detected automatically).
3. No environment variables are needed. Deploy.

The canonical base URL lives in `src/lib/site.ts` (`SITE_URL`) — update it if
you deploy under a different domain.
