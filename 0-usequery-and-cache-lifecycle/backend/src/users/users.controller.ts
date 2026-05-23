import { Controller, Get, Logger, Query } from "@nestjs/common"
import { UsersService, type User } from "./users.service"

/**
 * UsersController — GET /users với query optional `?delay=N` để mô phỏng latency.
 * (EN: UsersController — GET /users with optional `?delay=N` to simulate latency.)
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)

    constructor(private readonly usersService: UsersService) {}

    /**
     * Trả về danh sách user; log mỗi lần gọi để học viên quan sát deduplication.
     * (EN: Return user list; log each call so learners observe deduplication.)
     */
    @Get()
    async list(@Query("delay") delay?: string): Promise<User[]> {
        const delayMs = delay ? Number.parseInt(delay, 10) : 0
        this.logger.log(`GET /users (delay=${delayMs}ms)`)
        return this.usersService.findAll(Number.isFinite(delayMs) ? delayMs : 0)
    }
}
