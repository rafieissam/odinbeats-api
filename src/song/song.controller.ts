import { Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { GetSongsDto } from './dto';
import { User } from 'src/auth/decorators';
import { UserGuard } from 'src/auth/guards';

@Controller('songs')
@UserGuard()
export class SongController {

    constructor (private songService: SongService) {}

    @Get('')
    async getChunk(@User('sub') userId: string, @Query() dto: GetSongsDto) {
        return await this.songService.getChunk(userId, dto);
    }

    @Get('top-ten')
    async getTopTen(@User('sub') userId: string) {
        const dto = new GetSongsDto();
        dto.skip = 0;
        dto.limit = 10;
        dto.orderBy = 'plays';
        dto.orderDir = 'desc';
        return await this.songService.getChunk(userId, dto);
    }

    @Get('liked')
    async getLiked(@User('sub') userId: string, @Query() dto: GetSongsDto) {
        return await this.songService.getLiked(userId, dto);
    }

    @Post(':songId/play')
    async registerPlay(@User('sub') userId: string, @Param('songId') songId: string) {
        return await this.songService.registerPlay(userId, songId);
    }


    @Patch(':songId/like')
    async likeSong(@User('sub') userId: string, @Param('songId') songId: string) {
        const res = await this.songService.likeSong(userId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.CONFLICT);
        }
        return res;
    }

    @Patch(':songId/unlike')
    async unlikeSong(@User('sub') userId: string, @Param('songId') songId: string) {
        return await this.songService.unlikeSong(userId, songId);
    }
}
