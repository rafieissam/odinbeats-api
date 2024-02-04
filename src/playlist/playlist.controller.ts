import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserGuard } from 'src/auth/guards';
import { PlaylistService } from './playlist.service';
import { User } from 'src/auth/decorators';
import { PlaylistUpdateDto } from './dto';

@Controller('playlists')
@UserGuard()
export class PlaylistController {

    constructor (private playlistService: PlaylistService) {}

    @Get('')
    async getAll(@User('sub') userId: string) {
        return await this.playlistService.getAll(userId);
    }

    @Get(':playlistId')
    async getOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.getOne(userId, playlistId);
    }

    @Post('')
    async createOne(@User('sub') userId: string) {
        return await this.playlistService.createOne(userId);
    }

    @Patch(':playlistId')
    async updateOne(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body() dto: PlaylistUpdateDto) {
        return await this.playlistService.updateOne(userId, playlistId, dto);
    }

    @Delete(':playlistId')
    async deleteOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.deleteOne(userId, playlistId);
    }

    @Patch(':playlistId/add-song')
    async addSongToPlaylist(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        const res = await this.playlistService.addSongToPlaylist(userId, playlistId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.NOT_FOUND);
        }
        return res;
    }

    @Patch(':playlistId/remove-song')
    async removeSongToPlaylist(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        const res = await this.playlistService.removeSongFromPlaylist(userId, playlistId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.NOT_FOUND);
        }
        return res;
    }
}
