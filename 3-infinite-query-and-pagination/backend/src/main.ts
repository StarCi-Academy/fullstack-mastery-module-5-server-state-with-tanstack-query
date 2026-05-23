import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap (EN: Bootstrap) — port 3000.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: "http://localhost:3001" })
    await app.listen(3000)
}
bootstrap()
