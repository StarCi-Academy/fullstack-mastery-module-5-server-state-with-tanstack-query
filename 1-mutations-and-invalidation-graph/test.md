# Test flows for 1-mutations-and-invalidation-graph

## Flow 1 — Add user invalidates list
**Purpose:** Verify `useMutation` + `invalidateQueries(["users"])` refreshes the list with the newly created row.
**Playwright file:** `.playwright/scripts/flow-1-add-user-invalidates-list.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-add-user-invalidates-list.spec.ts`
**Pass criteria:** New email row visible in the list.

## Flow 2 — Delete user refreshes list
**Purpose:** Verify delete mutation triggers cache invalidation and the row disappears.
**Playwright file:** `.playwright/scripts/flow-2-delete-user-refreshes-list.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-delete-user-refreshes-list.spec.ts`
**Pass criteria:** Deleted row is hidden after the mutation completes.

## Flow 3 — Invalidation triggers a refetch
**Purpose:** Verify each `invalidateQueries(["users"])` causes a fresh `GET /users` network call.
**Playwright file:** `.playwright/scripts/flow-3-invalidation-triggers-refetch.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-invalidation-triggers-refetch.spec.ts`
**Pass criteria:** ≥ 2 `GET /users` requests observed after one mutation completes.
