import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Load more nối thêm page tiếp theo (10→20).
 * (EN: Flow 2 — Load more appends the next page [10→20].)
 */
test("flow 2 — clicking Load more appends the next 10 items", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByTestId("total-count")).toHaveText("10")

    await page.getByTestId("btn-load-more").click()
    await expect(page.getByTestId("total-count")).toHaveText("20")
    await expect(page.getByTestId("user-20")).toBeVisible()
    await expect(page.getByTestId("has-next")).toHaveText("yes")
})
