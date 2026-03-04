# Vercel + Supabase setup (brief)

## 1. Supabase (create tables — do this once)

1. Open your IdeaPulse project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. In the left sidebar click **SQL Editor** → **New query**.
3. Open the file **`supabase/run-once.sql`** in this repo, copy **all** of it, paste into the query box, then click **Run**.

All required tables will be created. You can confirm in **Table Editor** (users, idea_batches, ideas, etc.).

## 2. Vercel (environment variables and deploy)

1. Open [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Click the project **IdeaPulse** (or your project name).
3. In the top navigation, click **Settings**.
4. In the left sidebar, click **Environment Variables**.
5. For each variable below: click **Add**, set **Name** and **Value**, set **Environment** to Production (and Preview if needed), click **Save**.
   - **Name** = `NEXT_PUBLIC_SUPABASE_URL`, **Value** = your Supabase project URL (from Supabase Dashboard → Settings → API).
   - **Name** = `NEXT_PUBLIC_SUPABASE_ANON_KEY`, **Value** = Supabase anon key.
   - **Name** = `SUPABASE_SERVICE_ROLE_KEY`, **Value** = Supabase service_role key.
   - **Name** = `OPENAI_API_KEY`, **Value** = from [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
   - **Name** = `RESEND_API_KEY`, **Value** = from [resend.com](https://resend.com).
   - **Name** = `EMAIL_FROM`, **Value** = e.g. `IdeaPulse <onboarding@resend.dev>`.
   - **Name** = `NEXT_PUBLIC_APP_URL`, **Value** = your production URL, e.g. `https://idea-pulse-chi.vercel.app`.
   - **Name** = `ACTION_LINK_SECRET`, **Value** = any long random string (at least 32 characters).
6. In the left sidebar, click **Deployments**.
7. Open the **"..."** menu on the latest deployment, click **Redeploy** so env vars are applied.

## 3. Supabase Auth (magic links and redirects)

Do this so login/signup magic-link emails work in production. Use the same URL as `NEXT_PUBLIC_APP_URL` (e.g. `https://idea-pulse-chi.vercel.app`).

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Select the **IdeaPulse** project (or your project).
3. In the left sidebar, click **Authentication**.
4. Under Authentication, click **URL Configuration**.
5. Set **Site URL** to your production URL (e.g. `https://idea-pulse-chi.vercel.app`).
6. Under **Redirect URLs**, click **Add URL** and add `https://your-production-url.vercel.app/loading` (replace with your real URL).
7. Click **Add URL** again and add `https://your-production-url.vercel.app/profile`.
8. Click **Add URL** again and add `https://your-production-url.vercel.app/dashboard`.
9. Click **Save**.
10. Ensure Vercel has **Name** = `NEXT_PUBLIC_APP_URL` set to that same production URL (step 2 above). If it is missing or set to localhost, magic links will not work.

## 4. Auth mode

**Real login (default):** When `BYPASS_AUTH` is not set, users must sign in with email (magic link). Visiting `/dashboard`, `/ideas`, `/profile`, or `/analyze` without a session redirects to `/login`. Ensure `NEXT_PUBLIC_APP_URL` and Supabase redirect URLs are configured (step 3 above). Check `/api/health` to verify APP_URL is set correctly.

**Build mode (optional):** To treat all visits as one user (e.g. during development or before email is configured), set `BYPASS_AUTH=1` and `BYPASS_AUTH_EMAIL=your@email.com` (that user must exist in `users`). Then dashboard, ideas, and "Request more" work without real login. Remove these when email login is production-ready.

Done. The site will work once these are set and the migration has been run.
