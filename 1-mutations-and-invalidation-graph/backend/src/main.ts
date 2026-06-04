import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"
import type { AppConfig } from "./config"

/**
 * Bootstrap NestJS — port + CORS origin sourced from ConfigService (env-driven).
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const { port, frontendOrigin } = configService.getOrThrow<AppConfig>("app")
    app.enableCors({ origin: frontendOrigin })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.listen(port)
}

bootstrap()
