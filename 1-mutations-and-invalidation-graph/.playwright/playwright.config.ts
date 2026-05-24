import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright — testDir trỏ tới ./scripts.
 * webServer khởi động NestJS (3000) và Next.js (3001) nếu chưa chạy.
 * Spec mutate shared NestJS in-memory state → workers: 1 + fullyParallel: false để tránh race.
 * (EN: Playwright config — testDir ./scripts. webServer starts NestJS [3000] and Next.js [3001].
 * Specs mutate shared NestJS in-memory state → workers: 1 + fullyParallel: false to avoid races.)
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    workers: 1,
    fullyParallel: false,
    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: [
        {
            command: "npm install --prefer-offline && npx nest start",
            cwd: "../backend",
            port: 3000,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
        {
            command: "npm install --prefer-offline && npm run dev",
            cwd: "../frontend",
            port: 3001,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
    ],
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "head",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
    ],
})
