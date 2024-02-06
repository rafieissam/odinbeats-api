import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        required: true,
        example: "johndoe@gmail.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        required: true,
        example: "SecurePassword123",
    })
    @IsString()
    @IsNotEmpty()
    password;
}