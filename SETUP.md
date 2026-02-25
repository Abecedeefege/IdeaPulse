# Vercel + Supabase setup (brief)

## 1. Supabase

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project** (name it, set DB password).
2. **Project Settings** → **API**: copy **Project URL**, **anon** key, **service_role** key.
3. **SQL Editor** → **New query**: paste and run the contents of `supabase/migrations/20260219000000_initial_schema.sql`.

## 2. Vercel

1. Go to [vercel.com](https://vercel.com) → your **IdeaPulse** project → **Settings** → **Environment Variables**.
2. Add (Production + Preview):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL from Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `OPENAI_API_KEY` | From [platform.openai.com](https://platform.openai.com/api-keys) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `EMAIL_FROM` | e.g. `IdeaPulse <onboarding@resend.dev>` |
| `NEXT_PUBLIC_APP_URL` | Your live URL, e.g. `https://idea-pulse-chi.vercel.app` |
| `ACTION_LINK_SECRET` | Any long random string (32+ chars) |

3. **Deployments** → **Redeploy** latest so env vars are applied.

Done. The site will work once these are set and the migration has been run.
