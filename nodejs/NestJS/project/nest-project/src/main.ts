import { NestFactory, APP_PIPE } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 官方提供示例
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // 首先必须安装模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs'); // 模板引擎
  app.setViewEngine('ejs'); // 模板引擎

  // 配置虚拟目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static'
  })
  await app.listen(3001);
}
bootstrap();
