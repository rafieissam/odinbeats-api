import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserGuard } from 'src/auth/guards';
import { PlaylistService } from './playlist.service';
import { User } from 'src/auth/decorators';
import { PlaylistUpdateDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    @ApiResponse({ status: 200, description: 'The playlist has been successfully fetched.' })
    async getOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.getOne(userId, playlistId);
    }

    @Post('')
    @ApiResponse({ status: 201, description: 'The playlist has been successfully created.' })
    async createOne(@User('sub') userId: string) {
        return await this.playlistService.createOne(userId);
    }

    @Patch(':playlistId')
    @ApiResponse({ status: 200, description: 'The playlist has been successfully updated.' })
    async updateOne(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body() dto: PlaylistUpdateDto) {
        return await this.playlistService.updateOne(userId, playlistId, dto);
    }

    @Delete(':playlistId')
    @ApiResponse({ status: 200, description: 'The playlist has been successfully deleted.' })
    async deleteOne(@User('sub') userId: string, @Param('playlistId') playlistId: string) {
        return await this.playlistService.deleteOne(userId, playlistId);
    }

    @Patch(':playlistId/add-song')
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
    @ApiResponse({ status: 404, description: 'The playlist was not found.' })
    async addSongToPlaylist(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        const res = await this.playlistService.addSongToPlaylist(userId, playlistId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.NOT_FOUND);
        }
        return res;
    }

    @Patch(':playlistId/remove-song')
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
    @ApiResponse({ status: 404, description: 'The playlist was not found.' })
    async removeSongToPlaylist(@User('sub') userId: string, @Param('playlistId') playlistId: string, @Body('songId') songId: string) {
        const res = await this.playlistService.removeSongFromPlaylist(userId, playlistId, songId);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.NOT_FOUND);
        }
        return res;
    }
}
