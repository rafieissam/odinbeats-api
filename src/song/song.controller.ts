import { Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { GetSongsDto } from './dto';
import { User } from 'src/auth/decorators';
import { UserGuard } from 'src/auth/guards';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Songs')
@ApiBearerAuth()
@Controller('songs')
@UserGuard()
export class SongController {

    constructor (private songService: SongService) {}

    @Get('')
    @ApiResponse({ status: 200, description: 'The songs have been successfully fetched.' })
    async getChunk(@User('sub') userId: string, @Query() dto: GetSongsDto) {
        return await this.songService.getChunk(userId, dto);
    }

    @Get('top-ten')
    @ApiResponse({ status: 200, description: 'The top ten have been successfully fetched.' })
    async getTopTen(@User('sub') userId: string) {
        const dto = new GetSongsDto();
        dto.skip = 0;
        dto.limit = 10;
        dto.orderBy = 'plays';
        dto.orderDir = 'desc';
        return await this.songService.getChunk(userId, dto);
    }

    @Get('liked')
    @ApiResponse({ status: 200, description: 'The liked songs have been successfully fetched.' })
    async getLiked(@User('sub') userId: string, @Query() dto: GetSongsDto) {
        return await this.songService.getLiked(userId, dto);
    }

    @Post(':songId/play')
    @ApiResponse({ status: 201, description: 'The play has been successfully registered.' })
    async registerPlay(@User('sub') userId: string, @Param('songId') songId: string) {
        return await this.songService.registerPlay(userId, songId);
    }

    @Patch(':songId/like')
    @ApiResponse({ status: 200, description: 'The song has been successfully liked.' })
    async likeSong(@User('sub') userId: string, @Param('songId') songId: string) {
        const res = await this.songService.likeSong(userId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.CONFLICT);
        }
        return res;
    }

    @Patch(':songId/unlike')
    @ApiResponse({ status: 200, description: 'The song has been successfully unliked.' })
    async unlikeSong(@User('sub') userId: string, @Param('songId') songId: string) {
        return await this.songService.unlikeSong(userId, songId);
    }
}
