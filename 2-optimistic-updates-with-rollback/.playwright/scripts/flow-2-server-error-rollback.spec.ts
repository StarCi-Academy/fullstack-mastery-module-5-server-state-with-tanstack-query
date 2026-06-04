import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Server 500 → onError rolls back to snapshot.
 */
test("flow 2 — server 500 rolls back optimistic write to the previous value", async ({ page }) => {
    await page.goto("/")
    const original = await page.getByTestId("user-1-name").textContent()
    expect(original).not.toBeNull()

    // Enable fail flag
    await page.getByTestId("cb-fail").check()
    await page.getByTestId("input-name").fill("WILL_FAIL")
    await page.getByTestId("btn-save").click()

    // The optimistic write was rolled back to the snapshot — name is back to the
    // original value, proving onError restored the previous cache after the 500.
    await expect(page.getByTestId("user-1-name")).toHaveText(original ?? "")
})
