import { IsEmail, IsString } from "class-validator";

export class EditMeDto {
    @IsEmail()
    email: string;
    
    @IsString()
    name: string;
}