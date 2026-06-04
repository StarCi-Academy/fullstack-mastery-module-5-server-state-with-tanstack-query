import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from "./users"

/**
 * Root module — only contains UsersModule + standard ConfigModule.
 */
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
})
export class AppModule {}
