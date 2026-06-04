import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule — registers controller + service.
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
