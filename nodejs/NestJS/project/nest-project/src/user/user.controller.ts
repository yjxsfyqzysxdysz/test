import { Controller, Get, Post, Body, Response, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  @Render('default/user')
  index() {}

  @Post('doAdd')
  doAdd(@Body() body, @Response() res) {
    console.log(body)
    res.redirect('/user') // 路由跳转
    // return 'add success'
  }
}
