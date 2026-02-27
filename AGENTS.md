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
| Cron trigger | `npm run cron:send` or `GET /api/cron/send` |

### Environment variables

Copy `.env.example` to `.env.local`. The app requires Supabase, OpenAI, and (optionally) Resend credentials. Without real Supabase credentials, the UI renders but auth/data flows return errors. See `.env.example` for the full list.

### External service dependencies

- **Supabase** (cloud-hosted Postgres + Auth): required for all authenticated flows. No local Supabase CLI setup exists; this project uses a hosted Supabase instance only.
- **OpenAI API**: required for idea generation and deep analysis.
- **Resend API**: optional; only needed for email delivery. The web UI works without it.

### Gotchas

- The repository ships without an `.eslintrc.json`; a minimal one (`"extends": "next/core-web-vitals"`) was added to enable `npm run lint` and `npm run build` without interactive prompts. The strict `next/typescript` extension would cause build failures due to pre-existing lint issues in the code.
- There is no test framework or test suite in this project.
- The project has no Docker or devcontainer configuration; it relies entirely on hosted cloud services.
- `.env.local` is gitignored and must be created locally from `.env.example`.
