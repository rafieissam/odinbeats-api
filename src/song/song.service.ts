import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSongsDto } from './dto';

@Injectable()
export class SongService {

    constructor(private prisma: PrismaService) {}

    private async getSongsAggregate(userId: string, dto: GetSongsDto, likedByUser: boolean = false) {
        let whereClauses: any = [];
        if (likedByUser) {
            whereClauses.push({
                likes: {
                    some: {
                        userId,
                    },
                }
            });
        }
        if (dto.text && dto.text.trim() != '') {
            dto.text = dto.text.trim().split(" ").join(" & ");
            whereClauses.push({
                name: {
                    search: dto.text,
                },
                artist: {
                    search: dto.text,
                },
            });
        }
        const relationFields = ["likes", "plays"];
        const rawSongs = await this.prisma.song.findMany({
            where: {
                AND: whereClauses,
            },
            include: {
                likes: {
                    select: {
                        songId: true,
                        userId: true,
                        addedAt: true,
                    },
                    where: {
                        userId,
                    },
                },
                _count: {
                    select: {
                        plays: true,
                        likes: true,
                    },
                },
            },
            orderBy: {
                ...(relationFields.includes(dto.orderBy) ? {
                    [dto.orderBy]: {
                        _count: dto.orderDir,
                    }
                } : {
                    [dto.orderBy]: dto.orderDir,
                }),
            },
            skip: dto.skip,
            take: dto.limit,
        });

        return rawSongs.map((song: any) => {
            song.isLiked = song.likes.filter(likes => likes.userId == userId).length > 0;
            delete song.likes;
            return song;
        });
    }

    async getChunk(userId: string, dto: GetSongsDto) {
        return this.getSongsAggregate(userId, dto);
    }

    async getLiked(userId: string, dto: GetSongsDto) {
        return this.getSongsAggregate(userId, dto, true);
    }
    
    async registerPlay(userId: string, songId: string) {
        await this.prisma.songPlay.create({
            data: {
                userId, songId
            },
        });
        return { message: "Song play registered successfully!" };
    }
    
    async likeSong(userId: string, songId: string) {
        const existingLike = await this.prisma.likedSong.findFirst({
            where: {
                songId: songId,
                userId: userId,
            },
        });
        if (existingLike) {
            return { error: true, message: "Song already liked!" };
        }
        await this.prisma.likedSong.create({
            data: {
                userId, songId
            },
        });
        return { message: "Song liked successfully!" };
    }

    async unlikeSong(userId: string, songId: string) {
        await this.prisma.likedSong.delete({
            where: {
                songId_userId: {
                    userId,
                    songId,
                },
            },
        });
        return { message: "Song unliked successfully!" };
    }

}
