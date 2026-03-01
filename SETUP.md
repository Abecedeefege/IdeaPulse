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

## 4. No login gates (until email validation is complete)

The app treats every visit as logged in as a default user (`pulse@itamoa.com`, or set `BYPASS_AUTH_EMAIL`). **That user must exist in the `users` table** (e.g. create once via onboarding with that email). Then dashboard, ideas, and "Request more" work for all visitors without real login. No redirects to login.

**In Vercel (step-by-step):**

1. Open [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Click the project **IdeaPulse** (or your project name).
3. In the top navigation, click **Settings**.
4. In the left sidebar, click **Environment Variables**.
5. Click **Add**. Set **Name** = `BYPASS_AUTH`, **Value** = `1`. Set **Environment** to Production (and Preview if you want). Click **Save**.
6. Click **Add** again. Set **Name** = `BYPASS_AUTH_EMAIL`, **Value** = the email of the user to act as (e.g. `pulse@itamoa.com`). That user must exist in the `users` table. Set **Environment** to Production (and Preview if needed). Click **Save**.
7. In the left sidebar, click **Deployments**. Open the **"..."** menu on the latest deployment, click **Redeploy** so the new env vars are applied.

**Locally:** In `.env.local`, add `BYPASS_AUTH=1` and `BYPASS_AUTH_EMAIL=your@email.com` (user must exist in `users`). Restart the dev server.

Remove these env vars when email login is production-ready.

Done. The site will work once these are set and the migration has been run.
