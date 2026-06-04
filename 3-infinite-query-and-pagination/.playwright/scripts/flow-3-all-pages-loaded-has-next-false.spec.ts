import { test, expect } from "@playwright/test"

/**
 * Flow 3 — After all pages load, hasNextPage=false and button is disabled.
 */
test("flow 3 — after loading all pages, hasNextPage flips to false", async ({ page }) => {
    await page.goto("/")

    // Step 1: load page 2 → 20 items
    await page.getByTestId("btn-load-more").click()
    await expect(page.getByTestId("total-count")).toHaveText("20")

    // Step 2: load page 3 → 25 items (seed=25)
    await page.getByTestId("btn-load-more").click()
    await expect(page.getByTestId("total-count")).toHaveText("25")

    // Step 3: hasNextPage becomes false
    await expect(page.getByTestId("has-next")).toHaveText("no")
    await expect(page.getByTestId("btn-load-more")).toBeDisabled()
})
