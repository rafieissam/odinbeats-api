import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/decorators';
import { UserGuard } from 'src/auth/guards';
import { EditMeDto } from './dto';

@Controller('users')
export class UserController {

    constructor (private userService: UserService) {}

    @Get('me')
    @UserGuard()
    async getMe(@User('sub') userId: string) {
        return await this.userService.getOne(userId);
    }

    // @Patch('me')
    // async editMe(@User('sub') userId: string, @Body() dto: EditMeDto) {
    //     return await this.userService.editOne(userId, dto);
    // }

    // @Delete('me')
    // async deleteMe(@User('sub') userId: string) {
    //     return await this.userService.deleteOne(userId);
    // }

    // @Get()
    // getAll() {
    //     return this.userService.getAll();
    // }

    // @Get(':id')
    // getOne(@Param('id') userId: string) {
    //     return this.userService.getOne(userId);
    // }

    // @Post()
    // addOne() {
    //     const body = 1;
    //     return this.userService.addOne(body);
    // }

    // @Patch(':id')
    // editOne(@Param('id') userId: string) {
    //     const body = 1;
    //     return this.userService.editOne(userId, body);
    // }

    // @Delete(':id')
    // deleteOne(@Param('id') userId: string) {
    //     return this.userService.deleteOne(userId);
    // }
}
