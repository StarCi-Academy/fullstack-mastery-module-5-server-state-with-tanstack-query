import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub trên cổng 3000.
 * (EN: Bootstrap NestJS stub on port 3000.)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: "http://localhost:3001" })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.listen(3000)
}

bootstrap()
