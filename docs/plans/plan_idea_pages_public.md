# Plan: Idea pages public (top-ideas links work for all users)

## Problem

Links from `/top-ideas` go to `/idea/[id]` or `/idea/curated/[slug]`, but middleware protects `/idea` and redirects unauthenticated users to `/login`, so idea pages do not display for logged-out users.

## Goal

ALL users (no login) can view idea detail pages linked from top-ideas.

## Change

In [src/middleware.ts](../../src/middleware.ts):

1. Remove `/idea` from `PROTECTED_PAGES` (so the array no longer includes `"idea"`).
2. Remove `/idea/:path*` from the `config.matcher` array so that `/idea/*` and `/idea/curated/*` are no longer protected.

Keep `/dashboard`, `/ideas`, `/profile`, `/analyze` protected.

## Result

Unauthenticated users can open `/idea/[id]` and `/idea/curated/[slug]` and see the idea. Get similar ideas / like-dislike on that page may still require login (existing behavior).

## Revert

Re-add `"idea"` to PROTECTED_PAGES and add `/idea/:path*` back to the matcher.
