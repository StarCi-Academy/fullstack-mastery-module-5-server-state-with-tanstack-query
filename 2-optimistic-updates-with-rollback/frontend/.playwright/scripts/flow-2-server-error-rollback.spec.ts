import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Server 500 → onError rollback về snapshot.
 * (EN: Flow 2 — Server 500 → onError rolls back to snapshot.)
 */
test("flow 2 — server 500 rolls back optimistic write to the previous value", async ({ page }) => {
    await page.goto("/")
    const original = await page.getByTestId("user-1-name").textContent()
    expect(original).not.toBeNull()

    // Bật fail flag (EN: enable fail flag)
    await page.getByTestId("cb-fail").check()
    await page.getByTestId("input-name").fill("WILL_FAIL")
    await page.getByTestId("btn-save").click()

    // Trạng thái error xuất hiện (EN: error state appears)
    await expect(page.getByTestId("status")).toHaveText("error")

    // Rollback về giá trị cũ (EN: rolled back to old value)
    await expect(page.getByTestId("user-1-name")).toHaveText(original ?? "")
})
