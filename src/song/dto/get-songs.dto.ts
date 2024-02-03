import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class GetSongsDto {
    @IsString()
    @IsOptional()
    text: string;

    @Transform(skip => Number.parseInt(skip.value))
    @IsInt()
    @Min(0)
    skip: number = 0;

    @Transform(limit => Number.parseInt(limit.value))
    @IsInt()
    @Min(0)
    limit: number = 10;

    @IsString()
    @IsIn(["name", "plays", "likes"])
    orderBy: "name" | "plays" | "likes" = "name";
    
    @IsString()
    @IsIn(["asc", "desc"])
    orderDir: "asc" | "desc" = "asc";
}