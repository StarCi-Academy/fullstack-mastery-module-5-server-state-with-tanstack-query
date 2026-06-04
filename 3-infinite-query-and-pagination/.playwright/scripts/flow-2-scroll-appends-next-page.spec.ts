import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Scrolling to the bottom auto-loads the next page (10→20).
 */
test("flow 2 — scrolling appends the next 10 items", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByTestId("total-count")).toHaveText("10")

    // Scroll the feed box to the bottom → the sentinel enters view → next page loads.
    await page
        .getByTestId("users-scroll")
        .evaluate((el) => el.scrollTo(0, el.scrollHeight))

    await expect(page.getByTestId("total-count")).toHaveText("20")
    await expect(page.getByTestId("user-20")).toBeVisible()
    await expect(page.getByTestId("has-next")).toHaveText("yes")
})
