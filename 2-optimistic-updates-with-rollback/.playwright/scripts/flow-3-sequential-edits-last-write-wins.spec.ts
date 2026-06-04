import { test, expect } from "@playwright/test"

/**
 * Flow 3 — Two sequential edits: the last write wins after server confirmation.
 */
test("flow 3 — sequential edits collapse to last-write-wins", async ({ page }) => {
    await page.goto("/")

    const a = `Edit-A-${Date.now()}`
    await page.getByTestId("input-name").fill(a)
    await page.getByTestId("btn-save").click()
    await expect(page.getByTestId("user-1-name")).toHaveText(a)

    const b = `Edit-B-${Date.now()}`
    await page.getByTestId("input-name").fill(b)
    await page.getByTestId("btn-save").click()
    await expect(page.getByTestId("user-1-name")).toHaveText(b)
})
