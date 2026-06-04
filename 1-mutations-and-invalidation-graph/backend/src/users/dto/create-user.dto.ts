import { IsEmail, IsString, MinLength } from "class-validator"

/**
 * DTO for creating a new user.
 */
export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name!: string

    @IsEmail()
    email!: string
}
