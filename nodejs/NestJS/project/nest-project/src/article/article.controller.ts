import { Controller, Get, Query, Request, Post, Body, Param } from '@nestjs/common';

import { NewsService } from '../news/news.service'

@Controller('article')
export class ArticleController {

  constructor(private newsService: NewsService) { }

  @Get()
  index() {
    return this.newsService.findAll()
    // return 'i am a article page'
  }

  // 通过@Query()装饰器获取get传值
  @Get('add')
  addData(@Query() query) {
    console.log(query)
    return query;
  }

  // 通过@Request()装饰器获取get传值
  @Get('edit')
  editData(@Request() req) {
    console.log(req.query)
    return req.query;
  }

  // 通过@Body()装饰器获取post传值
  @Post('creat')
  create(@Body() body, @Query() req) {
    console.log(req, body)
    return 'this is post theam'
  }

  // 获取动态路由
  @Get("default/:id")
  getid(@Param() param) {
    console.log(param)
    return `default: ${param.id}`
  }

}
