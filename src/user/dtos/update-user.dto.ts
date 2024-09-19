import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDto {

    @IsBoolean()
    @IsOptional()
    isChef: boolean;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    phone: string;
}
