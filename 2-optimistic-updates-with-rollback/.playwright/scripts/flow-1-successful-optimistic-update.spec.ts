import { test, expect } from "@playwright/test"

/**
 * Flow 1 — Successful optimistic update.
 */
test("flow 1 — optimistic update writes immediately and persists after server confirms", async ({
    page,
}) => {
    await page.goto("/")
    await expect(page.getByTestId("user-1-name")).toBeVisible()

    const next = `Alice-${Date.now()}`
    await page.getByTestId("input-name").fill(next)
    await page.getByTestId("btn-save").click()

    // Optimistic write is immediate
    await expect(page.getByTestId("user-1-name")).toHaveText(next)

    // After invalidate, name remains
    await page.waitForTimeout(500)
    await expect(page.getByTestId("user-1-name")).toHaveText(next)
})
