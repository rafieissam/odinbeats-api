import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/decorators';
import { UserGuard } from 'src/auth/guards';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UserGuard()
export class UserController {

    constructor (private userService: UserService) {}

    @Get('me')
    @ApiResponse({ status: 200, description: 'The current user has been successfully fetched.' })
    async getMe(@User('sub') userId: string) {
        return await this.userService.getOne(userId);
    }
}
