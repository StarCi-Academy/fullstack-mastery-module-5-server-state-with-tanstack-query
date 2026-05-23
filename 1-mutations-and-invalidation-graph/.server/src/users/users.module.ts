import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule (EN: UsersModule).
 */
@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule {}
