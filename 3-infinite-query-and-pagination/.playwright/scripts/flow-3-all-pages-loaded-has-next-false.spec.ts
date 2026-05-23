import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Sau khi tải hết, hasNextPage=false và button bị disable.
 * (EN: Flow 3 — After all pages load, hasNextPage=false and button is disabled.)
 */
test("flow 3 — after loading all pages, hasNextPage flips to false", async ({ page }) => {
    await page.goto("/")

    // Bước 1: load page 2 (EN: load page 2) → 20 items
    await page.getByTestId("btn-load-more").click()
    await expect(page.getByTestId("total-count")).toHaveText("20")

    // Bước 2: load page 3 (EN: load page 3) → 25 items (seed=25)
    await page.getByTestId("btn-load-more").click()
    await expect(page.getByTestId("total-count")).toHaveText("25")

    // Bước 3: hasNextPage flip false (EN: hasNextPage becomes false)
    await expect(page.getByTestId("has-next")).toHaveText("no")
    await expect(page.getByTestId("btn-load-more")).toBeDisabled()
})
