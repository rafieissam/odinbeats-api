import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/auth/guards';
import { PlaylistService } from './playlist.service';
import { User } from 'src/auth/decorators';
import { PlaylistUpdateDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistGuard } from './playlist.guard';

@ApiTags('Playlists')
@ApiBearerAuth()
@Controller('playlists')
@UserGuard()
export class PlaylistController {

    constructor (private playlistService: PlaylistService) {}

    @Get('')
    @ApiResponse({ status: 200, description: 'The playlists have been successfully fetched.' })
    async getAll(@User('sub') userId: string) {
        return await this.playlistService.getAll(userId);
    }

    @Get(':playlistId')
    @UseGuards(PlaylistGuard)
    @ApiResponse({ status: 200, description: 'The playlist has been successfully fetched.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.getOne(userId, playlistId);
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'The playlist has been successfully created.' })
    async createOne(@User('sub') userId: string) {
        return await this.playlistService.createOne(userId);
    }

    @Patch(':playlistId')
    @UseGuards(PlaylistGuard)
    @ApiResponse({ status: 200, description: 'The playlist has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateOne(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body() dto: PlaylistUpdateDto) {
        return await this.playlistService.updateOne(userId, playlistId, dto);
    }

    @Delete(':playlistId')
    @UseGuards(PlaylistGuard)
    @ApiResponse({ status: 200, description: 'The playlist has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.deleteOne(userId, playlistId);
    }

    @Patch(':playlistId/add-song')
    @UseGuards(PlaylistGuard)
    @ApiBody({
        required: true,
        schema: {
            properties: {
                songId: {
                    type: 'string',
                    
                }
            },
            required: ['songId'],
        },
    })
    @ApiResponse({ status: 200, description: 'The song has been successfully added to playlist.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async addSongToPlaylist(@Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        return await this.playlistService.addSongToPlaylist(playlistId, songId);
    }

    @Patch(':playlistId/remove-song')
    @UseGuards(PlaylistGuard)
    @ApiBody({
        required: true,
        schema: {
            properties: {
                songId: {
                    type: 'string',
                    
                }
            },
            required: ['songId'],
        },
    })
    @ApiResponse({ status: 200, description: 'The song has been successfully removed from playlist.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async removeSongToPlaylist(@Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        return await this.playlistService.removeSongFromPlaylist(playlistId, songId);
    }
}
