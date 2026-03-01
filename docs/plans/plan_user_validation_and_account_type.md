# Plan: User data validation and account type check

## Goal

- **User data validation:** Validate and sanitize user-supplied data (profile, preferences, email) on signup and update; enforce schema and limits.
- **Account type check:** Distinguish free vs paid accounts and enforce limits (e.g. ideas per day, analyses per week) and feature access (e.g. deep analysis, private ideas) by account type.

## Part A: User data validation

### 1. Profile and onboarding input

- **File:** [src/lib/validation.ts](../../src/lib/validation.ts) (or new schema file).
- Define Zod (or equivalent) schemas for:
  - Onboarding/signup: email (valid format, max length), optional profile fields (primary_goal, interests array, preference_summary), string length limits.
  - Profile update: same fields, optional; validate types and ranges.
- **File:** [src/app/api/onboarding/route.ts](../../src/app/api/onboarding/route.ts): Validate request body with the schema; return 400 with clear message on failure.
- **File:** [src/app/api/profile/route.ts](../../src/app/api/profile/route.ts): Validate PATCH body with profile schema; return 400 on failure.

### 2. Email and identity

- Ensure email is normalized (trim, lowercase) before lookup or insert.
- If using magic-link only, ensure Supabase Auth email matches the `users` table row used for app logic (e.g. upsert on first sign-in).

### 3. Request-more and other APIs

- [src/app/api/request-more/route.ts](../../src/app/api/request-more/route.ts): Validate body (email format if provided); validate user exists and is not unsubscribed (already in place). Add explicit schema if not present.
- Apply consistent validation patterns across APIs that accept user input.

## Part B: Account type check

### 1. Data model

- **Option A:** Add `account_type` (or `plan`) column to `users` table, e.g. `free` | `pro` | `team` (default `free`). Migrate existing rows to `free`; set pulse@itamoa.com (or specific emails) to `pro`/`team` as needed.
- **Option B:** Use a separate `subscriptions` or `plans` table keyed by user_id with plan name and optional Stripe/customer id; default to free when no row.
- Document the chosen model in SETUP or a schema doc.

### 2. Quota and limits by account type

- **File:** [src/lib/env.ts](../../src/lib/env.ts): Already has `RATE_LIMIT_IDEAS_PER_DAY`; consider per-plan overrides (e.g. env or DB-driven: free=10, pro=100, team=unlimited or higher).
- **File:** [src/app/api/similar-ideas/route.ts](../../src/app/api/similar-ideas/route.ts): Resolve current user’s account type; apply the correct daily limit (and return 403 with upgrade message when over limit for free).
- **File:** [src/app/api/request-more/route.ts](../../src/app/api/request-more/route.ts): If batch-per-day limit differs by plan, check account type and apply the right limit.
- **Analyses:** If deep analysis or other features are paid-only, add account type check before running the feature; return 402 or 403 with upgrade CTA when not allowed.

### 3. Feature gating

- Where the UI or API exposes paid-only features (e.g. "Deep analysis", "Private ideas"), check account type (and optionally subscription status) and either hide the option or show "Upgrade" / "Coming soon" and block the API with a clear error.

### 4. Helpers

- Add a small helper (e.g. `getAccountType(userId): Promise<'free'|'pro'|'team'>`) that reads from `users` (or subscriptions table) and returns the plan. Use it in API routes and optionally in Server Components to avoid duplication.

## Verification

- Invalid profile/onboarding payloads return 400 with a clear validation message.
- Free account over daily idea limit receives 403 and message to upgrade or try tomorrow.
- Pro/team accounts receive higher (or unlimited) limits as configured.
- Paid-only features are blocked or gated for free accounts.

## Revert

- Remove `account_type` usage and revert to single default limit if needed; keep validation in place for data integrity.
