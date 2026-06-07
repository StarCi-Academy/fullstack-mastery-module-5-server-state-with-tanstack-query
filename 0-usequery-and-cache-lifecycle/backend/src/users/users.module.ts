import { Module } from "@nestjs/common"
import { ResponseDelayInterceptor } from "../common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule — registers controller + service.
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService, ResponseDelayInterceptor],
})
export class UsersModule {}
