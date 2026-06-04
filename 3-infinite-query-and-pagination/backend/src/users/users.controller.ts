import { Controller, Get, Logger, Query } from "@nestjs/common"
import { UsersService, type UsersPage } from "./users.service"

/**
 * UsersController — GET /users?cursor=N&limit=M.
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private readonly usersService: UsersService) {}

    /**
     * Return cursor-bounded page.
     */
    @Get()
    page(@Query("cursor") cursor?: string, @Query("limit") limit?: string): UsersPage {
        const c = cursor ? Number.parseInt(cursor, 10) : 0
        const l = limit ? Number.parseInt(limit, 10) : 10
        this.logger.log(`GET /users cursor=${c} limit=${l}`)
        return this.usersService.findPage(
            Number.isFinite(c) ? c : 0,
            Number.isFinite(l) ? l : 10,
        )
    }
}
