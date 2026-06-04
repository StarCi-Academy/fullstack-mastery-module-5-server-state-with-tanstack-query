import { test, expect } from "@playwright/test"

/**
 * Flow 3 — After scrolling through every page, hasNextPage flips to false.
 */
test("flow 3 — after loading all pages, hasNextPage flips to false", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByTestId("total-count")).toHaveText("10")

    // Step 1: scroll → page 2 (20 items)
    await page
        .getByTestId("users-scroll")
        .evaluate((el) => el.scrollTo(0, el.scrollHeight))
    await expect(page.getByTestId("total-count")).toHaveText("20")

    // Step 2: scroll → page 3 (25 items, seed=25)
    await page
        .getByTestId("users-scroll")
        .evaluate((el) => el.scrollTo(0, el.scrollHeight))
    await expect(page.getByTestId("total-count")).toHaveText("25")

    // Step 3: list exhausted → hasNextPage=false
    await expect(page.getByTestId("has-next")).toHaveText("no")
})
