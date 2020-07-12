import { Controller, Get, Render } from '@nestjs/common';

import { NewsService } from './news.service';

@Controller('news')
export class NewsController {

  constructor(private newServices: NewsService) { }

  @Get()
  @Render('default/news')
  index() {
    // console.log(this.newServices.findAll());
    return {
      newsList: this.newServices.findAll()
    }
  }
}
