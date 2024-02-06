import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Welcome')
  @ApiResponse({ status: 200, description: 'The welcome page is fetched successfully.' })
  getWelcome(): string {
    return this.appService.getWelcome();
  }
}
