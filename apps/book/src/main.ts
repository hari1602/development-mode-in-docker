import { NestFactory } from '@nestjs/core';
import { RedisService } from '@app/common';
import { BookModule } from './book.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BookModule);
  const redisService = app.get<RedisService>(RedisService);
  app.connectMicroservice(redisService.getOptions(), {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();

  Logger.log(`Book Server is listening`, 'bootstrap');
}
bootstrap();
