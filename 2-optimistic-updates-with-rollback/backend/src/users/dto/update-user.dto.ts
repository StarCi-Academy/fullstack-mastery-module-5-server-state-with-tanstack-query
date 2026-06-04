import { IsOptional, IsString, MinLength } from "class-validator"

/**
 * User update DTO.
 */
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string
}
