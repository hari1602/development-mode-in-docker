import { NestFactory } from '@nestjs/core';
import { RedisService } from '@app/common';
import { OrderModule } from './order.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const redisService = app.get<RedisService>(RedisService);
  app.connectMicroservice(redisService.getOptions(), {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();

  Logger.log(`Order Server is listening`, 'bootstrap');
}
bootstrap();
