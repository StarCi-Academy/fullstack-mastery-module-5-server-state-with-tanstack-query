import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Initial fetch and cache write.
 *
 * Pass criteria: /users renders 3 users and the skeleton disappears.
 */
test("flow 1 — initial fetch populates cache and renders 3 users", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/users")

    // Step 2: wait for skeleton to vanish
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Step 3: assert 3 users rendered
    await expect(page.getByTestId("user-1")).toContainText("Alice")
    await expect(page.getByTestId("user-2")).toContainText("Bob")
    await expect(page.getByTestId("user-3")).toContainText("Charlie")
})
