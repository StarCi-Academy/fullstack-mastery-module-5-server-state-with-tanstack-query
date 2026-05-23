import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Refetch khi cửa sổ được focus lại.
 * (EN: Flow 3 — Refetch when window regains focus.)
 *
 * Pass criteria: sau blur/focus, có thêm một request /users được phát đi.
 * (EN: Pass criteria: after blur/focus, a second /users request is issued.)
 */
test("flow 3 — window blur+focus triggers a background refetch", async ({ page, context }) => {
    let usersCalls = 0
    page.on("request", (req) => {
        if (req.url().includes("/users") && req.method() === "GET") {
            usersCalls += 1
        }
    })

    // Bước 1: vào trang users (EN: Step 1: visit users)
    await page.goto("/users")
    await expect(page.getByTestId("users-list")).toBeVisible()
    expect(usersCalls).toBe(1)

    // Bước 2: mở tab phụ rồi đóng để blur/focus trang chính
    // (EN: Step 2: open a second tab then close it to blur/focus the main page)
    const tab2 = await context.newPage()
    await tab2.goto("about:blank")
    await tab2.close()
    await page.bringToFront()

    // Bước 3: chờ refetch thứ hai (EN: Step 3: wait for the second fetch)
    await expect.poll(() => usersCalls, { timeout: 5_000 }).toBeGreaterThanOrEqual(2)
})
