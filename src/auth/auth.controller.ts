import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Cookies } from './decorators';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignUpDto) {
        const res = await this.authService.signup(dto);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.CONFLICT);
        }
        return res;
    }

    @Post('signin')
    async signin(@Body() dto: SignInDto) {
        const res = await this.authService.signin(dto);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.FORBIDDEN);
        }
        return res;
    }

    @Post('refresh-token')
    async refreshToken(@Cookies('refreshToken') refreshToken: string) {
        const res = await this.authService.refreshToken(refreshToken);
        if (res.error) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        }
        return res;
    }

}
