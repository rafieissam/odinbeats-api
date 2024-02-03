import { IsNotEmpty, IsString } from "class-validator";

export class PlaylistUpdateDto {
    @IsString()
    @IsNotEmpty()
    name;
}