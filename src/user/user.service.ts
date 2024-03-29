import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async getOne(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId }});
        delete user.password;
        return user;
    }
}
