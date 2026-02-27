# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

IdeaPulse is a Next.js 15 (App Router, Turbopack) + TypeScript app that delivers AI-generated business ideas via email. See `README.md` for the full tech stack.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000, Turbopack) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Test | `npm test` (Vitest) |
| Test watch | `npm run test:watch` |
| Cron trigger | `npm run cron:send` or `GET /api/cron/send` |

### Environment variables

Copy `.env.example` to `.env.local`. The app requires Supabase, OpenAI, and (optionally) Resend credentials. Without real Supabase credentials, the UI renders but auth/data flows return errors. See `.env.example` for the full list. `ACTION_LINK_SECRET` must be at least 32 characters (no default fallback).

### External service dependencies

- **Supabase** (cloud-hosted Postgres + Auth): required for all authenticated flows. No local Supabase CLI setup exists; this project uses a hosted Supabase instance only.
- **OpenAI API**: required for idea generation and deep analysis.
- **Resend API**: optional; only needed for email delivery. The web UI works without it.

### Architecture notes

- **Auth middleware** (`src/middleware.ts`): protects `/dashboard`, `/ideas`, `/idea/*`, `/profile`, `/analyze` pages and `/api/me`, `/api/profile`, `/api/request-more`, `/api/usage` API routes. Token-authenticated routes (`/api/idea/[id]/*`) bypass middleware and verify JWTs internally.
- **Validation**: Zod schemas in `src/lib/validation.ts` validate API input. Centralized env validation in `src/lib/env.ts`.
- **Error boundaries**: `error.tsx` files exist at root, dashboard, ideas, and idea/[id] levels.
- **Loading states**: `loading.tsx` skeleton files exist for dashboard, ideas, idea/[id], and top-ideas.
- **SEO**: Dynamic pages use `generateMetadata()`. Sitemap at `/sitemap.xml`, robots at `/robots.txt`.
- **UI components**: Reusable `Button`, `Input`, `Card` in `src/components/ui/`.

### Gotchas

- `.eslintrc.json` uses `next/core-web-vitals` only (not `next/typescript`) to avoid build failures from pre-existing type issues.
- `.env.local` is gitignored and must be created locally from `.env.example`.
- The project has no Docker or devcontainer configuration; it relies entirely on hosted cloud services.
- RLS policies are defined in `supabase/migrations/20260227000000_add_rls.sql` but must be run against your Supabase project manually.
