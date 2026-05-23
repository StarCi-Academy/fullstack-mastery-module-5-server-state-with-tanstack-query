import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Submit form add-user → list cập nhật sau invalidate.
 * (EN: Flow 1 — Submit add-user form → list refreshes after invalidate.)
 */
test("flow 1 — adding a user invalidates the users query and shows the new row", async ({
    page,
}) => {
    // Bước 1: vào trang chính (EN: Step 1: visit home)
    await page.goto("/")
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Bước 2: điền form và submit (EN: Step 2: fill form and submit)
    const unique = `dora-${Date.now()}@example.com`
    await page.getByTestId("input-name").fill("Dora")
    await page.getByTestId("input-email").fill(unique)
    await page.getByTestId("btn-add").click()

    // Bước 3: assert hàng mới xuất hiện (EN: Step 3: assert new row visible)
    await expect(page.getByText(unique)).toBeVisible()
})
