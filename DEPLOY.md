# Deployment — Step-by-step (Vercel + Supabase)

Super-specific instructions. One action per step.

---

## Vercel: Environment variables

1. Open https://vercel.com/dashboard.
2. Click the project **IdeaPulse** (or your project name).
3. In the top navigation, click **Settings**.
4. In the left sidebar, click **Environment Variables**.
5. For each variable below: click **Add**, set **Name** and **Value**, set **Environment** to Production (and Preview if needed), click **Save**.
   - **Name** = `NEXT_PUBLIC_SUPABASE_URL`, **Value** = your Supabase project URL (from Supabase Dashboard → Settings → API).
   - **Name** = `NEXT_PUBLIC_SUPABASE_ANON_KEY`, **Value** = Supabase anon key.
   - **Name** = `SUPABASE_SERVICE_ROLE_KEY`, **Value** = Supabase service_role key.
   - **Name** = `OPENAI_API_KEY`, **Value** = from https://platform.openai.com/api-keys.
   - **Name** = `RESEND_API_KEY`, **Value** = from https://resend.com.
   - **Name** = `EMAIL_FROM`, **Value** = e.g. `IdeaPulse <onboarding@resend.dev>`.
   - **Name** = `NEXT_PUBLIC_APP_URL`, **Value** = your production URL, e.g. `https://idea-pulse-chi.vercel.app`.
   - **Name** = `ACTION_LINK_SECRET`, **Value** = any long random string (at least 32 characters).
6. In the left sidebar, click **Deployments**.
7. Open the **"..."** menu on the latest deployment, click **Redeploy** so env vars are applied.

---

## Supabase: Auth URL configuration

1. Open https://supabase.com/dashboard.
2. Select the **IdeaPulse** project (or your project).
3. In the left sidebar, click **Authentication** → **URL Configuration**.
4. Set **Site URL** to `https://your-production-url.vercel.app` (same as your Vercel production URL).
5. Under **Redirect URLs**, click **Add URL** and add `https://your-production-url.vercel.app/loading`. Add `https://your-production-url.vercel.app/profile`. Add `https://your-production-url.vercel.app/dashboard`. Use full URLs for each.
6. Click **Save**.

---

## Vercel: Bypass auth (build mode)

Until email login is production-ready:

1. Open https://vercel.com/dashboard.
2. Click the project **IdeaPulse**.
3. Click **Settings** → **Environment Variables**.
4. Click **Add**. Set **Name** = `BYPASS_AUTH`, **Value** = `1`. Set **Environment** to Production (and Preview if needed). Click **Save**.
5. Click **Add** again. Set **Name** = `BYPASS_AUTH_EMAIL`, **Value** = the email of the user to act as (e.g. `pulse@itamoa.com`). That user must exist in the `users` table. Click **Save**.
6. Go to **Deployments**, open the **"..."** menu on the latest deployment, click **Redeploy**.
