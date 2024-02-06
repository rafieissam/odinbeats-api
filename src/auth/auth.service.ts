import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: SignUpDto) {
        dto.password = await bcrypt.hash(dto.password, 10);
        try {
            const user = await this.prisma.user.create({
                data: dto,
            });
            delete user.password;
            const tokens = await this.generateTokens(user.id, { email: user.email });
            return { message: "User signup successfully!", results: { user, ...tokens } };
        } catch (err) {
            if (err.code == "P2002") {
                return { error: true, message: "Email already registered!" };
            }
            throw err;
        }
    }

    async signin(dto: SignInDto) {
        const user = await this.prisma.user.findFirst({ where: { email: dto.email }});
        const hashedPassword = user.password;
        const valid = await bcrypt.compare(dto.password, hashedPassword);
        if (!valid) {
            return { error: true, message: "Invalid email or password!" };
        }
        const tokens = await this.generateTokens(user.id, { email: user.email });
        return { message: "User signin successful!", results: { user, ...tokens } };
    }

    async refreshToken(token: string) {
        const hashedToken = this.sha256Hash(token);
        const refreshToken = await this.prisma.refreshToken.findFirst({ where: { token: hashedToken }, include: { user: true }});
        if (!refreshToken) {
            return { error: true, message: "Invalid token provided!" };
        }
        const user = refreshToken.user;
        const tokens = await this.generateTokens(user.id, { email: user.email });
        return { message: "Refresh token successful!", results: { user, ...tokens } };
    }

    private async generateTokens(userId: string, payload: any) {
        const accessToken = await this.signAccessToken(userId, payload);
        const refreshToken = await this.generateRefreshToken(userId);
        return {
            accessToken,
            refreshToken,
        };
    }

    private async signAccessToken(userId: string, payload: any) {
        return await this.jwt.signAsync({
            sub: userId,
            ...payload,
        }, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET'),
        });
    }

    private async generateRefreshToken(userId: string) {
        const token: string = uuidv4();
        const hashedToken = this.sha256Hash(token);
        
        const refreshTokenLife = parseInt(this.config.get('REFRESH_TOKEN_TTL'));
        const expiresAt: Date = new Date();
        expiresAt.setTime(new Date().getTime() + refreshTokenLife);

        await this.prisma.refreshToken.upsert({
            where: {
                userId,
            },
            update: {
                token: hashedToken,
                expiresAt
            },
            create: {
                userId,
                token: hashedToken,
                expiresAt
            }
        });
        return {
            token,
            options: {
                maxAge: refreshTokenLife,
                httpOnly: true,
                secure: true,
            },
        };
    }
    
    private sha256Hash(input: string): string {
      const hash = crypto.createHash('sha256');
      hash.update(input);
      return hash.digest('hex');
    }
}
