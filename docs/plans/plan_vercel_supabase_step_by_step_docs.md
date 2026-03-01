# Plan: Vercel and Supabase instructions — super specific, step-by-step

## Rule (add to CLAUDE.md)

When giving Vercel or Supabase instructions, be **super specific** and list them **step-by-step** (numbered steps, one action per step). No vague "configure X"; use exact menu paths and variable names.

## Implementation

1. Add this rule to [CLAUDE.md](../../CLAUDE.md).
2. Add or rewrite the deployment section in [SETUP.md](../../SETUP.md) (or create DEPLOY.md) so that all Vercel and Supabase instructions use the step-by-step format below.

## Example format

### Vercel

1. Open https://vercel.com/dashboard.
2. Click the project "IdeaPulse" (or your project name).
3. In the top navigation, click **Settings**.
4. In the left sidebar, click **Environment Variables**.
5. For each variable (e.g. `NEXT_PUBLIC_APP_URL`): click **Add**, set **Name** = `NEXT_PUBLIC_APP_URL`, **Value** = `https://your-production-url.vercel.app`, **Environment** = Production (and Preview if needed), click **Save**. Repeat for all required vars.
6. Go to **Deployments**, open the "..." menu on the latest deployment, click **Redeploy**.

### Supabase

1. Open https://supabase.com/dashboard.
2. Select the IdeaPulse project.
3. In the left sidebar, click **Authentication** → **URL Configuration**.
4. Set **Site URL** to `https://your-production-url.vercel.app` (same as your Vercel production URL).
5. Under **Redirect URLs**, click **Add URL** and add `https://your-production-url.vercel.app/loading`. Add `https://your-production-url.vercel.app/profile`. Add `https://your-production-url.vercel.app/dashboard`. Use full URLs for each.
6. Click **Save**.
