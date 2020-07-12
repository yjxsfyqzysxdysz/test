import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  findAll() {
    return [
      { "title": "新闻1" },
      { "title": "新闻2" },
      { "title": "新闻3" },
      { "title": "新闻4" }
    ]
  }
}
