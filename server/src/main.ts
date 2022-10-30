import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Init } from './dbsource/index';
import 'reflect-metadata';

async function bootstrap() {
  //db初始化
  await Init();

  const app = await NestFactory.create(AppModule);
  //跨域资源共享
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
