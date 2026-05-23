import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright — testDir trỏ tới ./scripts (cùng folder .playwright/).
 * (EN: Playwright config — testDir points to ./scripts (sibling of .playwright/).)
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
