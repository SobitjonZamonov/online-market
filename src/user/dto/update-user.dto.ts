import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    password?: string
}