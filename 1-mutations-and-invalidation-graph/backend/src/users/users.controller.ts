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
 * UsersController — minimal REST CRUD for the TanStack mutations FE.
 */
@Controller("users")
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
     * Create user.
     */
    @Post()
    create(@Body() dto: CreateUserDto): User {
        this.logger.log(`POST /users ${dto.email}`)
        return this.usersService.create(dto)
    }

    /**
     * Delete user.
     */
    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id", ParseIntPipe) id: number): void {
        this.logger.log(`DELETE /users/${id}`)
        this.usersService.remove(id)
    }
}
