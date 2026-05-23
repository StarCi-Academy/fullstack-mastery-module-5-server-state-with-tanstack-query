import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from "./users"

/**
 * Root module (EN: Root module).
 */
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
})
export class AppModule {}
