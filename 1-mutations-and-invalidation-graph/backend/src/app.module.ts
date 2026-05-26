import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { appConfig } from "./config"
import { UsersModule } from "./users"

/**
 * Root module — load `app` registerAs() factory để main.ts đọc port + CORS origin.
 * (EN: Root module — loads the `app` registerAs() factory so main.ts can read port + CORS origin.)
 */
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
        UsersModule,
    ],
})
export class AppModule {}
