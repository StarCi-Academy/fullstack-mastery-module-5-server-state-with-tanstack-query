import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Delete user → list refreshes after invalidate.
 */
test("flow 2 — deleting a user removes the row after invalidation", async ({ page }) => {
    // Step 1: create a new user to safely delete
    await page.goto("/")
    const email = `eve-${Date.now()}@example.com`
    await page.getByTestId("input-name").fill("Eve")
    await page.getByTestId("input-email").fill(email)
    await page.getByTestId("btn-add").click()
    const row = page.getByText(email)
    await expect(row).toBeVisible()

    // Step 2: locate the delete button (HeroUI ListBox.Item renders a div, not <li>)
    const row = page.locator('[data-testid^="user-"]', { hasText: email })
    const deleteBtn = row.locator('[data-testid^="delete-"]')
    await deleteBtn.click()

    // Step 3: assert row is hidden
    await expect(row).toBeHidden()
})
