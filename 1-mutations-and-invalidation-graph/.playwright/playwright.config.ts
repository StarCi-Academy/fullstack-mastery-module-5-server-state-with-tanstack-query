import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright config — testDir points to ./scripts.
 * Ports + base URL read from env (BACKEND_PORT / FRONTEND_PORT / FRONTEND_ORIGIN) to support
 * parallel-audit port ranges; default 3000/3001 for a single session.
 * Specs mutate shared NestJS in-memory state → workers: 1 + fullyParallel: false to avoid races.
 */
const backendPort = parseInt(process.env.BACKEND_PORT ?? "3000", 10)
const frontendPort = parseInt(process.env.FRONTEND_PORT ?? "3001", 10)
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? `http://localhost:${frontendPort}`

export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    workers: 1,
    fullyParallel: false,
    use: {
        baseURL: frontendOrigin,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: [
        {
            command: "npm install --prefer-offline && npx nest start",
            cwd: "../backend",
            port: backendPort,
            env: {
                PORT: String(backendPort),
                FRONTEND_ORIGIN: frontendOrigin,
            },
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
        {
            command: "npm install --prefer-offline && npm run dev",
            cwd: "../frontend",
            port: frontendPort,
            env: {
                PORT: String(frontendPort),
                VITE_API_BASE: `http://localhost:${backendPort}`,
            },
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
