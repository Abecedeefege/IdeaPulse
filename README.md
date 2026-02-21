# IdeaPulse MVP

Email-based idea delivery: 10 tailored ideas per user, reactions (like/dislike), feedback, and on-demand business analysis.

## Tech stack

Next.js (App Router) + TypeScript, Supabase (Postgres), Tailwind CSS, Resend (email), OpenAI (Chat Completions + structured outputs).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and set: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `OPENAI_API_KEY`, `NEXT_PUBLIC_APP_URL`, `ACTION_LINK_SECRET`.
3. Run the SQL in `supabase/migrations/20260219000000_initial_schema.sql` in your Supabase project.
4. `npm run dev` — open http://localhost:3000

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel, add env vars, deploy. Set **Root Directory** to empty (repo root is the app). See RESTORE.md if files were lost.
