# IdeaPulse Spark

A kinetic, app-like evolution of IdeaPulse: a Tinder-style swipe deck of
business ideas. Swipe **right** to save an idea, **left** to skip. The deck is
personalized by your interests, budget, and effort level, refreshes daily,
tracks your streaks and stats, and every idea has a shareable link.

100% client-side. **Zero env vars, zero API keys, zero backend.**

## Stack

- [React 18](https://react.dev) + TypeScript (strict)
- [Vite 6](https://vite.dev) for dev/build
- [Tailwind CSS 3](https://tailwindcss.com) for styling
- No router, no animation library — views are React state, the swipe physics
  are hand-rolled with Pointer Events.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # typecheck (tsc --noEmit) + production build to dist/
npm run preview  # serve the production build locally
```

No environment variables are needed for any command.

## How the deterministic idea engine works

Ideas come from a built-in combinatorial engine (`src/engine/`): 24 audiences ×
24 problems × 12 business models × 16 optional twists, plus 40 hand-written
curated ideas (~1 curated per 4 generated). A session seed is derived from
`hash(sorted interests + epoch day)`, so your deck is personal to your filters,
fresh every day, and fully deterministic — replaying the same seed yields the
same deck. Every generated idea's id encodes its seed indices in base36
(`g-a.b.c.d`), so any idea can be perfectly reconstructed from its id alone.
That's what makes share links work with no server: `#i=<id>` in the URL is
decoded back into the full idea on load.

Your profile, saved ideas, seen history, and streak stats live in a single
versioned `localStorage` key (`spark:v1`).

## Deploy

Static host friendly: deploy to Vercel (a `vercel.json` with
`{"framework": "vite"}` is included), Netlify, GitHub Pages, or any static file
server — just serve the `dist/` folder. Share links use the URL hash
(`/#i=<id>`), so **no rewrites or server config are needed**.
