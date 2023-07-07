import { Controller, Get } from '@nestjs/common';
import { ColorService as AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello() {
    return this.appService.getHello();
  }
}
