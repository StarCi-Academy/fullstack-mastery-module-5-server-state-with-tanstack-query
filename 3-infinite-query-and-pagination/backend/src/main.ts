import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap (EN: Bootstrap) — port 3000.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const port = Number.parseInt(process.env.PORT ?? "3000", 10)
    const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3001"
    // VI: ENV override hỗ trợ audit/dev parallel; default vẫn giữ 3000 + localhost:3001 như rule.
    // EN: ENV overrides support audit/dev parallel; defaults remain 3000 + localhost:3001 per rule.
    app.enableCors({ origin: corsOrigin })
    await app.listen(port)
}
bootstrap()
