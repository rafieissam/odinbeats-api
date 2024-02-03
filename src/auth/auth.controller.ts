import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Cookies } from './decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignUpDto, @Res({ passthrough: true }) response: Response) {
        const res = await this.authService.signup(dto);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.CONFLICT);
        }
        const newRefreshToken = res.results.refreshToken;
        response.cookie('auth-token', newRefreshToken.token, newRefreshToken.options);
        delete res.results.refreshToken;
        return res;
    }

    @Post('signin')
    async signin(@Body() dto: SignInDto, @Res({ passthrough: true }) response: Response) {
        const res = await this.authService.signin(dto);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.FORBIDDEN);
        }
        const newRefreshToken = res.results.refreshToken;
        response.cookie('auth-token', newRefreshToken.token, newRefreshToken.options);
        delete res.results.refreshToken;
        return res;
    }

    @Post('refresh-token')
    async refreshToken(@Cookies('auth-token') refreshToken: string, @Res({ passthrough: true }) response: Response) {
        const res = await this.authService.refreshToken(refreshToken);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        }
        const newRefreshToken = res.results.refreshToken;
        response.cookie('auth-token', newRefreshToken.token, newRefreshToken.options);
        delete res.results.refreshToken;
        return res;
    }

}
