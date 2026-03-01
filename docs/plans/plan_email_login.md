# Plan: Implement email login properly

## Goal

Replace the current "all visits act as pulse@itamoa.com" behavior with real email (magic-link) authentication. Users sign up or log in with email; Supabase sends a magic link; the app uses the authenticated user for dashboard, ideas, and APIs.

## Prerequisites

- `NEXT_PUBLIC_APP_URL` set in production to the canonical URL (no localhost).
- Supabase Auth URL Configuration: Site URL = production URL; Redirect URLs include `/loading`, `/profile`, `/dashboard` (full URLs).
- Resend (or email provider) configured so magic-link and batch emails can be sent.

## Changes

### 1. Re-enable auth in middleware

- **File:** [src/middleware.ts](../../src/middleware.ts)
- Restore Supabase auth check for protected paths. If no session and path is protected page → redirect to `/login?redirect=<pathname>`. If protected API → return 401.
- Remove the "always NextResponse.next()" behavior so that unauthenticated users are sent to login for `/dashboard`, `/ideas`, `/profile`, `/analyze` and get 401 for `/api/me`, `/api/profile`, `/api/request-more`, `/api/usage`.

### 2. Revert getServerUser() to real auth only

- **File:** [src/lib/supabase-server.ts](../../src/lib/supabase-server.ts)
- Return the Supabase Auth user when session exists; otherwise return `null`. Remove the fallback that looks up `pulse@itamoa.com` (or BYPASS_AUTH_EMAIL) so that only real logged-in users get a user object.

### 3. Magic-link and onboarding flows

- **Server** [src/lib/auth-server.ts](../../src/lib/auth-server.ts): Keep existing behavior — refuse to send when APP_URL missing/invalid; set `emailRedirectTo` to `NEXT_PUBLIC_APP_URL + "/loading"` (or appropriate path).
- **Client** [src/lib/auth.ts](../../src/lib/auth.ts): Keep existing check for APP_URL; build redirect with leading slash.
- **Onboarding** [src/app/api/onboarding/route.ts](../../src/app/api/onboarding/route.ts): Handle `APP_URL_NOT_SET` and return 503 with clear message.
- **Login page** [src/app/login/page.tsx](../../src/app/login/page.tsx): Show "Service misconfigured" or similar when APP_URL is missing (already in place if auth throws).

### 4. Post-auth redirect

- After magic-link click, user lands on `/loading` (or configured path) and is then redirected to profile/dashboard. Ensure `redirect` query param from login is honored after auth so users land where they intended.

### 5. Optional: health/debug route for APP_URL

- Add a route (e.g. `/api/health` or `/api/debug`) that returns whether `NEXT_PUBLIC_APP_URL` is set and not localhost in production, so misconfiguration can be spotted without sending an email.

### 6. Documentation

- Update [SETUP.md](../../SETUP.md): Remove or shorten "Temporary: act as logged in"; document that real login is required and how to configure APP_URL and Supabase redirect URLs (step-by-step already in SETUP).
- Update [.env.example](../../.env.example): Remove or comment BYPASS_AUTH / BYPASS_AUTH_EMAIL if no longer used.

## Verification

- In production, open the app without a session → visiting `/dashboard` or `/ideas` redirects to `/login`.
- Sign up or log in with email → receive magic-link email; link opens correct production URL and user is logged in.
- Logged-in user can access dashboard, ideas, request-more, and similar-ideas; logged-out user cannot.

## Revert

If issues arise, re-introduce the default-user fallback in getServerUser() and the "always next()" middleware so all visits act as pulse@itamoa.com again (as before this plan).
