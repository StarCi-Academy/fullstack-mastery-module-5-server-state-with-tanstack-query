# Test flows for 2-optimistic-updates-with-rollback

## Flow 1 — Successful optimistic update
**Purpose:** Verify `onMutate` writes optimistically; UI changes immediately; server confirmation preserves the value.
**Playwright file:** `.playwright/scripts/flow-1-successful-optimistic-update.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-successful-optimistic-update.spec.ts`
**Pass criteria:** `user-1-name` shows the new name immediately and remains after invalidate.

## Flow 2 — Server error rollback
**Purpose:** Verify `onError` restores the snapshot when the server returns 500.
**Playwright file:** `.playwright/scripts/flow-2-server-error-rollback.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-server-error-rollback.spec.ts`
**Pass criteria:** After `?fail=true` triggers HTTP 500, the user name reverts to its original value.

## Flow 3 — Sequential edits last-write-wins
**Purpose:** Verify two sequential successful edits result in the last write being the visible value.
**Playwright file:** `.playwright/scripts/flow-3-sequential-edits-last-write-wins.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-sequential-edits-last-write-wins.spec.ts`
**Pass criteria:** After two saves, the second value is visible.
