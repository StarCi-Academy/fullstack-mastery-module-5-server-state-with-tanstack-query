import { test, expect } from "@playwright/test"

/**
 * Flow 2 — Navigate within staleTime: no extra request.
 *
 * Pass criteria: only one /users request fires across two mounts.
 */
test("flow 2 — re-mount within staleTime hits cache (one network call)", async ({ page }) => {
    let usersCalls = 0
    page.on("request", (req) => {
        // Count only NestJS API calls; ignore non-API browser navigation (Vite HMR, etc.).
        if (req.url().startsWith("http://localhost:3000/users") && req.method() === "GET") {
            usersCalls += 1
        }
    })

    // Step 1: visit users
    await page.goto("/users")
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Step 2: navigate to home then back
    await page.getByTestId("link-home").click()
    await expect(page.getByTestId("link-users")).toBeVisible()
    await page.getByTestId("link-users").click()
    await expect(page.getByTestId("users-list")).toBeVisible()

    // Step 3: assert exactly one request
    expect(usersCalls).toBe(1)
})
