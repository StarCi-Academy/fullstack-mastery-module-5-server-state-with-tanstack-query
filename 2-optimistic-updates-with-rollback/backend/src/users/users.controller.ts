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
    UseInterceptors,
} from "@nestjs/common"
import { ResponseDelayInterceptor } from "../common"
import { UpdateUserDto } from "./dto"
import { UsersService, type User } from "./users.service"

/**
 * UsersController — supports optional `?fail=true` on PATCH to demonstrate rollback.
 */
@Controller("users")
@UseInterceptors(ResponseDelayInterceptor)
export class UsersController {
    private readonly logger = new Logger(UsersController.name)
    constructor(private readonly usersService: UsersService) {}

    /**
     * List users.
     */
    @Get()
    list(): User[] {
        this.logger.log("GET /users")
        return this.usersService.findAll()
    }

    /**
     * PATCH /users/:id — throws 500 when `fail=true` to trigger rollback.
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
