import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Query,
} from "@nestjs/common"
import { UpdateUserDto } from "./dto"
import { UsersService, type User } from "./users.service"

/**
 * UsersController — hỗ trợ optional `?fail=true` trên PATCH để minh hoạ rollback.
 * (EN: UsersController — supports optional `?fail=true` on PATCH to demonstrate rollback.)
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private readonly usersService: UsersService) {}

    /**
     * Liệt kê users (EN: List users).
     */
    @Get()
    list(): User[] {
        this.logger.log("GET /users")
        return this.usersService.findAll()
    }

    /**
     * PATCH /users/:id — nếu `fail=true` thì throw 500 cho rollback.
     * (EN: PATCH /users/:id — throws 500 when `fail=true` to trigger rollback.)
     */
    @Patch(":id")
    patch(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
        @Query("fail") fail?: string,
    ): User {
        this.logger.log(`PATCH /users/${id} (fail=${fail ?? "false"})`)
        if (fail === "true") {
            throw new InternalServerErrorException("Forced failure for rollback demo")
        }
        return this.usersService.patch(id, { name: dto.name })
    }
}
