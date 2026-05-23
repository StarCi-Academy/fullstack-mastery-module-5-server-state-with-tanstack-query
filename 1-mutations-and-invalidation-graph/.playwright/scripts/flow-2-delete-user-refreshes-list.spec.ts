import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Delete user → list refresh sau invalidate.
 * (EN: Flow 2 — Delete user → list refreshes after invalidate.)
 */
test("flow 2 — deleting a user removes the row after invalidation", async ({ page }) => {
    // Bước 1: tạo user mới để xoá an toàn (EN: Step 1: create a user we can safely delete)
    await page.goto("/")
    const email = `eve-${Date.now()}@example.com`
    await page.getByTestId("input-name").fill("Eve")
    await page.getByTestId("input-email").fill(email)
    await page.getByTestId("btn-add").click()
    const row = page.getByText(email)
    await expect(row).toBeVisible()

    // Bước 2: lấy id từ data-testid của nút delete (EN: Step 2: locate the delete button)
    const li = page.locator("li", { hasText: email })
    const deleteBtn = li.locator('[data-testid^="delete-"]')
    await deleteBtn.click()

    // Bước 3: assert row biến mất (EN: Step 3: assert row removed)
    await expect(row).toBeHidden()
})
