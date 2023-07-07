import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('color')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getColor() {
    return {
      color: this.appService.getRandomColor(),
    };
  }
}
