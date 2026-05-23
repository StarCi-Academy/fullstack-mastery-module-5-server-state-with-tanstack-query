# Test flows for 0-usequery-and-cache-lifecycle

## Flow 1 — Initial fetch and cache write
**Purpose:** Verify that the first visit to `/users` fires a single `GET /users` request and populates the cache.
**Playwright file:** `.playwright/scripts/flow-1-initial-fetch-and-cache-write.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-initial-fetch-and-cache-write.spec.ts`
**Pass criteria:** Test passes; `users-list` is visible; users Alice/Bob/Charlie rendered.

## Flow 2 — Navigate within staleTime (no refetch)
**Purpose:** Verify that re-mounting within `staleTime` (30s) does NOT trigger an extra network call.
**Playwright file:** `.playwright/scripts/flow-2-navigate-within-stale-time.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-navigate-within-stale-time.spec.ts`
**Pass criteria:** Exactly one `GET /users` request observed across two mounts.

## Flow 3 — Refetch on window focus
**Purpose:** Verify that blur + focus triggers a background refetch (default `refetchOnWindowFocus: true`).
**Playwright file:** `.playwright/scripts/flow-3-refetch-on-window-focus.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-refetch-on-window-focus.spec.ts`
**Pass criteria:** At least 2 `GET /users` requests observed after blur/focus cycle.
