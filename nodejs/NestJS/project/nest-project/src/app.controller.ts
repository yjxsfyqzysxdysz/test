import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  // 访问模板引擎
  @Get('medal')
  @Render('default/index')
  getMedal(): Object {
    return { "name": "zhangesan" }
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }
}
