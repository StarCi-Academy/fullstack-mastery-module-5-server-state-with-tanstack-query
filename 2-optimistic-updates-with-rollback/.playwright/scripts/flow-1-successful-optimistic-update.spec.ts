import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Optimistic update thành công.
 * (EN: Flow 1 — Successful optimistic update.)
 */
test("flow 1 — optimistic update writes immediately and persists after server confirms", async ({
    page,
}) => {
    await page.goto("/")
    await expect(page.getByTestId("user-1-name")).toBeVisible()

    const next = `Alice-${Date.now()}`
    await page.getByTestId("input-name").fill(next)
    await page.getByTestId("btn-save").click()

    // Optimistic ghi ngay (EN: optimistic write is immediate)
    await expect(page.getByTestId("user-1-name")).toHaveText(next)

    // Sau invalidate, vẫn giữ tên mới (EN: after invalidate, name remains)
    await page.waitForTimeout(500)
    await expect(page.getByTestId("user-1-name")).toHaveText(next)
})
