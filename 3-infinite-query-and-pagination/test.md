# Test flows for 3-infinite-query-and-pagination

## Flow 1 — Initial page loads 10 items
**Purpose:** Verify `useInfiniteQuery` fetches the first cursor page (0..10) and reports `hasNextPage=true`.
**Playwright file:** `.playwright/scripts/flow-1-initial-page-loads-10-items.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-initial-page-loads-10-items.spec.ts`
**Pass criteria:** `total-count` reads "10"; `user-10` visible; `has-next` reads "yes".

## Flow 2 — Load more appends next page
**Purpose:** Verify `fetchNextPage()` appends the next cursor slice (10..20) onto the existing list.
**Playwright file:** `.playwright/scripts/flow-2-load-more-appends-next-page.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-load-more-appends-next-page.spec.ts`
**Pass criteria:** `total-count` reads "20" after clicking Load more; `user-20` visible.

## Flow 3 — All pages loaded → hasNextPage=false
**Purpose:** Verify that exhausting all pages (seed=25) flips `hasNextPage` to false and disables the button.
**Playwright file:** `.playwright/scripts/flow-3-all-pages-loaded-has-next-false.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-all-pages-loaded-has-next-false.spec.ts`
**Pass criteria:** `total-count` reads "25"; `has-next` reads "no"; `btn-load-more` is disabled.
