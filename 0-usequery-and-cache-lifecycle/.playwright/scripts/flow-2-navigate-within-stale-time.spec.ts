import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Điều hướng trong staleTime: không có request mới.
 * (EN: Flow 2 — Navigate within staleTime: no extra request.)
 *
 * Pass criteria: chỉ một request /users được gửi qua hai lần mount.
 * (EN: Pass criteria: only one /users request fires across two mounts.)
 */
test("flow 2 — re-mount within staleTime hits cache (one network call)", async ({ page }) => {
    let usersCalls = 0
    page.on("request", (req) => {
        // Chỉ đếm request đến NestJS API, bỏ qua page navigation / RSC prefetch của Next.js.
        // (EN: Count only NestJS API calls, ignoring Next.js page navigation and RSC prefetch.)
        if (req.url().startsWith("http://localhost:3000/users") && req.method() === "GET") {
            usersCalls += 1
        }
    })

    // Bước 1: vào users (EN: Step 1: visit users)
    await page.goto("/users")
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Bước 2: về home rồi quay lại (EN: Step 2: navigate to home then back)
    await page.getByTestId("link-home").click()
    await expect(page.getByTestId("link-users")).toBeVisible()
    await page.getByTestId("link-users").click()
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Bước 3: assert đúng một request được gửi (EN: Step 3: assert exactly one request)
    expect(usersCalls).toBe(1)
})
