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

**Critical:** `NEXT_PUBLIC_APP_URL` must be set to the production Vercel URL (`https://idea-pulse-chi.vercel.app`) — there is no localhost fallback. All email links, magic link redirects, sitemap, and robots.txt use this value. If unset, the build will fail.

### External service dependencies

- **Supabase** (cloud-hosted Postgres + Auth): required for all authenticated flows. No local Supabase CLI setup exists; this project uses a hosted Supabase instance only.
- **OpenAI API**: required for idea generation and deep analysis.
- **Resend API**: optional; only needed for email delivery. The web UI works without it.

### Authentication architecture

- **Supabase Auth magic links**: passwordless OTP. `signInWithMagicLink()` in `src/lib/auth.ts` (client) and `sendMagicLinkServer()` in `src/lib/auth-server.ts` (server) both send links via Supabase Auth.
- **`users` table vs `auth.users`**: The app has its own `users` table with `auth_id UUID` linking to the Supabase Auth user UUID. The `/api/me` endpoint auto-links `auth_id` on first authenticated access.
- **RLS policies**: Use `auth_id = auth.uid()` (via subquery) so they correctly match the Supabase Auth session to the app user. All DB access currently uses the service-role key, so RLS is defense-in-depth.
- **Middleware** (`src/middleware.ts`): redirects unauthenticated users to `/login?redirect=<path>`. The login page reads this param and passes it as the magic link redirect.
- **Inline `AuthPrompt`** (`src/components/AuthPrompt.tsx`): shown when unauthenticated users try to like/dislike ideas or generate similar ideas. Sends a magic link inline without navigating away.

### Architecture notes

- **Validation**: Zod schemas in `src/lib/validation.ts` validate API input. Centralized env validation in `src/lib/env.ts`.
- **Error boundaries**: `error.tsx` files exist at root, dashboard, ideas, and idea/[id] levels.
- **Loading states**: `loading.tsx` skeleton files exist for dashboard, ideas, idea/[id], and top-ideas.
- **SEO**: Dynamic pages use `generateMetadata()`. Sitemap at `/sitemap.xml`, robots at `/robots.txt`.
- **UI components**: Reusable `Button`, `Input`, `Card` in `src/components/ui/`.

### Gotchas

- `.eslintrc.json` uses `next/core-web-vitals` only (not `next/typescript`) to avoid build failures from pre-existing type issues.
- `.env.local` is gitignored and must be created locally from `.env.example`.
- No Docker or devcontainer configuration; relies entirely on hosted cloud services.
- RLS policies in `supabase/migrations/20260228000000_add_auth_id.sql` must be run manually in Supabase SQL Editor.
- The `profiles` table exists but is unused; the app uses `users.profile_json` for all profile data.

### Supabase dashboard checklist

For auth to work, configure in Supabase dashboard → Auth → URL Configuration:
- **Site URL**: `https://idea-pulse-chi.vercel.app`
- **Redirect URLs**: `https://idea-pulse-chi.vercel.app/**`
