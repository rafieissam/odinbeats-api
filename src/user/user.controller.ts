import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/decorators';
import { UserGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {

    constructor (private userService: UserService) {}

    @Get('me')
    @UserGuard()
    async getMe(@User('sub') userId: string) {
        return await this.userService.getOne(userId);
    }
}
