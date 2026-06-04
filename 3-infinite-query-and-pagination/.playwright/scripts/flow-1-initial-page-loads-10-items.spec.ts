import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Initial page loads 10 items.
 */
test("flow 1 — initial page renders 10 items and hasNextPage=true", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByTestId("users-list")).toBeVisible()
    await expect(page.getByTestId("total-count")).toHaveText("10")
    await expect(page.getByTestId("has-next")).toHaveText("yes")
    await expect(page.getByTestId("user-10")).toBeVisible()
})
