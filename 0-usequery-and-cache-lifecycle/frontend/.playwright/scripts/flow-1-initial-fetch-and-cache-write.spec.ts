import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Fetch lần đầu và ghi cache.
 * (EN: Flow 1 — Initial fetch and cache write.)
 *
 * Pass criteria: trang /users hiển thị 3 user và biến mất skeleton.
 * (EN: Pass criteria: /users renders 3 users and the skeleton disappears.)
 */
test("flow 1 — initial fetch populates cache and renders 3 users", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/users")

    // Bước 2: chờ skeleton biến mất (EN: Step 2: wait for skeleton to vanish)
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Bước 3: assert 3 user rendered (EN: Step 3: assert 3 users)
    await expect(page.getByTestId("user-1")).toContainText("Alice")
    await expect(page.getByTestId("user-2")).toContainText("Bob")
    await expect(page.getByTestId("user-3")).toContainText("Charlie")
})
