import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Param,
    ParseIntPipe,
    Post,
} from "@nestjs/common"
import { CreateUserDto } from "./dto"
import { UsersService, type User } from "./users.service"

/**
 * UsersController — REST CRUD tối thiểu cho FE TanStack mutations.
 * (EN: UsersController — minimal REST CRUD for the TanStack mutations FE.)
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
     * Tạo user (EN: Create user).
     */
    @Post()
    create(@Body() dto: CreateUserDto): User {
        this.logger.log(`POST /users ${dto.email}`)
        return this.usersService.create(dto)
    }

    /**
     * Xoá user (EN: Delete user).
     */
    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id", ParseIntPipe) id: number): void {
        this.logger.log(`DELETE /users/${id}`)
        this.usersService.remove(id)
    }
}
