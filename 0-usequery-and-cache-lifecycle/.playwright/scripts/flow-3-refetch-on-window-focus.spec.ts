import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Refetch when window regains focus.
 *
 * Pass criteria: after blur/focus, a second /users request is issued.
 */
test("flow 3 — window blur+focus triggers a background refetch", async ({ page, context }) => {
    let usersCalls = 0
    page.on("request", (req) => {
        // Count only NestJS API calls; ignore non-API browser navigation (Vite HMR, etc.).
        if (req.url().startsWith("http://localhost:3000/users") && req.method() === "GET") {
            usersCalls += 1
        }
    })

    // Step 1: visit users
    await page.goto("/users")
    await expect(page.getByTestId("users-list")).toBeVisible()
    expect(usersCalls).toBe(1)

    // Step 2: dispatch visibilitychange to simulate window regaining focus
    // TanStack Query v5 listens to 'visibilitychange' (not 'focus') to trigger refetch.
    // bringToFront/tab switching is not enough in Playwright headless; manual dispatch is reliable.
    await page.evaluate(() => window.dispatchEvent(new Event("visibilitychange")))

    // Step 3: wait for the second fetch
    await expect.poll(() => usersCalls, { timeout: 5_000 }).toBeGreaterThanOrEqual(2)
})
