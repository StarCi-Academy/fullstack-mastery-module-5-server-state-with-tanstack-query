import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub on configurable port (default 3000).
 *
 * Reads PORT from env so the e2e runner can assign any free port
 * without colliding with other processes on the machine.
 * CORS origin is read from CORS_ORIGIN (default http://localhost:3001)
 * so the frontend Vite dev server can call the API regardless of port.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    // Allow the test runner to specify a different frontend origin via env.
    const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3001"
    app.enableCors({ origin: corsOrigin })
    // Use PORT env for flexible port assignment in CI / parallel e2e runs.
    const port = Number(process.env.PORT ?? 3000)
    await app.listen(port, "127.0.0.1")
}

bootstrap()
