import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlaylistUpdateDto } from './dto';

@Injectable()
export class PlaylistService {

    constructor(private prisma: PrismaService) {}

    async getAll(userId: string) {
        return await this.prisma.playlist.findMany({
            where: {
                userId,
            },
            include: {
                songs: {
                    include: {
                        song: true,
                    }
                },
            },
        });
    }

    async getOne(userId, playlistId) {
        return await this.prisma.playlist.findUnique({
            where: {
                id: playlistId,
                userId,
            },
            include: {
                songs: {
                    include: {
                        song: true,
                    }
                },
            },
        });
    }


    async createOne(userId: string) {
        const currentPlaylists = await this.getAll(userId);
        return await this.prisma.playlist.create({
            data: {
                userId,
                name: "Playlist #" + (currentPlaylists.length + 1),
            },
        });
    }

    async updateOne(userId: string, playlistId: string, dto: PlaylistUpdateDto) {
        await this.prisma.playlist.update({
            where: {
                id: playlistId,
                userId,
            },
            data: dto,
        });
        return { message: "Playlist updated successfully!" };
    }

    async deleteOne(userId: string, playlistId: string) {
        await this.prisma.playlistSong.deleteMany({
            where: { 
                playlistId,
            },
        });
        await this.prisma.playlist.delete({
            where: { 
                id: playlistId,
                userId,
            },
        });
        return { message: "Playlist deleted successfully!" };
    }

    async addSongToPlaylist(userId: string, playlistId: string, songId: string) {
        const preCheck = await this.getOne(userId, playlistId);
        if (!preCheck) {
            return { error: true, message: "Playlist not found!" };
        }
        await this.prisma.playlistSong.upsert({
            where: {
                songId_playlistId: {
                    playlistId,
                    songId,
                },
            },
            update: {},
            create: {
                playlistId,
                songId,
            },
        });
        return { message: "Song added to playlist successfully!" };
    }

    async removeSongFromPlaylist(userId: string, playlistId: string, songId: string) {
        const preCheck = await this.getOne(userId, playlistId);
        if (!preCheck) {
            return { error: true, message: "Playlist not found!" };
        }
        await this.prisma.playlistSong.delete({
            where: {
                songId_playlistId: {
                    playlistId,
                    songId,
                },
            },
        });
        return { message: "Song removed from playlist successfully!" };
    }

}
