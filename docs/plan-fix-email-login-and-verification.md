# Fix email login and verification

Plan to make magic-link and batch emails work correctly in production. Once done, disable `BYPASS_AUTH` / `BYPASS_AUTH_EMAIL`.

## 1. Production APP_URL

- Ensure `NEXT_PUBLIC_APP_URL` is set in production (Vercel) to the canonical URL; no localhost default in production (already enforced in `src/lib/env.ts`).
- Document in SETUP.md: add to deployment checklist if not already there.

## 2. Supabase Auth URL configuration

- **Site URL** = production URL (same as `NEXT_PUBLIC_APP_URL`).
- **Redirect URLs** include:
  - `https://<your-app>/loading`
  - `https://<your-app>/profile`
  - `https://<your-app>/dashboard`
- No localhost in production redirect list.

## 3. Magic-link sending

- **Server** (`src/lib/auth-server.ts`): Already refuses to send when APP_URL missing/localhost and returns `APP_URL_NOT_SET`.
- **Client** (`src/lib/auth.ts`): Already throws when APP_URL missing; login page shows "Service misconfigured" for URL errors.
- **Onboarding** (`src/app/api/onboarding/route.ts`): Already returns 503 on `APP_URL_NOT_SET`.
- **Verify in production:** Trigger magic link (signup and login) and confirm email link host/path. Unset APP_URL and confirm no send and clear error to the user.

## 4. Batch email links (Resend)

- `src/lib/email.ts`: Already uses APP_URL in production and throws if missing.
- Confirm Resend domain/sender is verified and links in batch emails use production URL.

## 5. Optional runtime check

- Add a small debug or health route that returns whether `NEXT_PUBLIC_APP_URL` is set and not localhost in production, so misconfiguration is visible without sending an email.

## 6. Turn off bypass

- Once email is verified working: remove or unset `BYPASS_AUTH` and `BYPASS_AUTH_EMAIL` and re-enforce normal auth (middleware and getServerUser no longer use bypass).

---

This plan can be split into smaller plans by topic (e.g. "APP_URL and Supabase URLs", "Magic-link code paths", "Batch email links", "Disable bypass") for incremental approval and build.
