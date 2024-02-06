import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class GetSongsDto {
    @ApiProperty({
        required: false,
        example: "Post Malone",
    })
    @IsString()
    @IsOptional()
    text: string;

    
    @ApiProperty({
        required: false,
        default: 0,
    })
    @Transform(skip => Number.parseInt(skip.value))
    @IsInt()
    @Min(0)
    skip: number = 0;

    
    @ApiProperty({
        required: false,
        default: 10,
    })
    @Transform(limit => Number.parseInt(limit.value))
    @IsInt()
    @Min(0)
    limit: number = 10;

    
    @ApiProperty({
        required: false,
        default: "name",
        enum: ["name", "plays", "likes"],
    })
    @IsString()
    @IsIn(["name", "plays", "likes"])
    orderBy: "name" | "plays" | "likes" = "name";
    
    
    @ApiProperty({
        required: false,
        default: "asc",
        enum: ["asc", "desc"],
    })
    @IsString()
    @IsIn(["asc", "desc"])
    orderDir: "asc" | "desc" = "asc";
}