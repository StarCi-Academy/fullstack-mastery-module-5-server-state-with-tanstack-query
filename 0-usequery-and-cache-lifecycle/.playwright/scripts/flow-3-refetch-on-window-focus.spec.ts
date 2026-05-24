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
        // Chỉ đếm request đến NestJS API, bỏ qua page navigation / RSC prefetch của Next.js.
        // (EN: Count only NestJS API calls, ignoring Next.js page navigation and RSC prefetch.)
        if (req.url().startsWith("http://localhost:3000/users") && req.method() === "GET") {
            usersCalls += 1
        }
    })

    // Bước 1: vào trang users (EN: Step 1: visit users)
    await page.goto("/users")
    await expect(page.getByTestId("users-list")).toBeVisible()
    expect(usersCalls).toBe(1)

    // Bước 2: dispatch visibilitychange để simulate window regain focus
    // (EN: Step 2: dispatch visibilitychange to simulate window regaining focus)
    // TanStack Query v5 lắng nghe 'visibilitychange' (không phải 'focus') để trigger refetch.
    // bringToFront/tab switching không đủ trong Playwright headless; dispatch thủ công là cách đáng tin.
    // (EN: TanStack Query v5 subscribes to 'visibilitychange' not 'focus' for refetch triggering.
    // bringToFront/tab switching is unreliable in Playwright headless; direct dispatch is the correct approach.)
    await page.evaluate(() => window.dispatchEvent(new Event("visibilitychange")))

    // Bước 3: chờ refetch thứ hai (EN: Step 3: wait for the second fetch)
    await expect.poll(() => usersCalls, { timeout: 5_000 }).toBeGreaterThanOrEqual(2)
})
