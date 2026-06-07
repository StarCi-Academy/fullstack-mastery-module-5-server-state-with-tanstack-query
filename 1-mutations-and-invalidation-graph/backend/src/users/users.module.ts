import { Module } from "@nestjs/common"
import { ResponseDelayInterceptor } from "../common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule.
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService, ResponseDelayInterceptor],
})
export class UsersModule {}
