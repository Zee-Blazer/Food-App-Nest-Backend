import { IsString, IsStrongPassword, IsNotEmpty, IsIn } from "class-validator";

export class CreateManagerDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    email: string;

    @IsString()
    bio: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    // @IsIn(["manager"], { message: "The role must be a manager" })
    @IsString()
    @IsNotEmpty()
    isChef: boolean;
}
