import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Cookies } from './decorators';
import { Response } from 'express';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signup')
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
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
    @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
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
    @ApiCookieAuth('auth-token')
    @ApiResponse({ status: 201, description: 'The user\'s token has been successfully refreshed.' })
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
