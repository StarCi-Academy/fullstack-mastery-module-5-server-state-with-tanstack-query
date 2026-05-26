import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS app; ports/origin có thể override qua env để hỗ trợ audit/session test.
 * (EN: Bootstrap; ports/origin overridable via env so audit/session tests can avoid collisions.)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const port = Number(process.env.PORT ?? 3000)
    const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3001"
    app.enableCors({ origin: frontendOrigin })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.listen(port)
}
bootstrap()
