import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Mỗi invalidate kích hoạt một GET /users (network count).
 * (EN: Flow 3 — Each invalidate triggers one GET /users [network count].)
 */
test("flow 3 — invalidation cascades into a fresh GET /users request", async ({ page }) => {
    let usersGets = 0
    page.on("request", (req) => {
        if (req.url().endsWith("/users") && req.method() === "GET") usersGets += 1
    })

    // Bước 1: load page (EN: Step 1: load page) → 1 GET
    await page.goto("/")
    await expect(page.getByTestId("users-list")).toBeVisible()
    expect(usersGets).toBe(1)

    // Bước 2: add user → invalidate → second GET (EN: Step 2: add user → invalidate → second GET)
    const email = `fox-${Date.now()}@example.com`
    await page.getByTestId("input-name").fill("Fox")
    await page.getByTestId("input-email").fill(email)
    await page.getByTestId("btn-add").click()
    await expect(page.getByText(email)).toBeVisible()

    // Bước 3: assert ≥ 2 GETs (EN: Step 3: assert at least 2 GETs)
    await expect.poll(() => usersGets, { timeout: 5_000 }).toBeGreaterThanOrEqual(2)
})
