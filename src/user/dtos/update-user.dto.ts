import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    isChef: boolean;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    phone: string;
}
