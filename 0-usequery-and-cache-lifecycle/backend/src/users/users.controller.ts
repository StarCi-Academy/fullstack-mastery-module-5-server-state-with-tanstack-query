import { Controller, Get, Logger, UseInterceptors } from "@nestjs/common"
import { ResponseDelayInterceptor } from "../common"
import { UsersService, type User } from "./users.service"

/**
 * UsersController — GET /users with a fixed 1s response delay for loading UI demos.
 */
@Controller("users")
@UseInterceptors(ResponseDelayInterceptor)
export class UsersController {
    private readonly logger = new Logger(UsersController.name)

    constructor(private readonly usersService: UsersService) {}

    /**
     * Return user list; log each call so learners observe deduplication.
     */
    @Get()
    list(): User[] {
        this.logger.log("GET /users")
        return this.usersService.findAll()
    }
}
