import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        REDIS_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
      envFilePath: `./apps/gateway/${process.env.NODE_ENV}.env`,
    }),
    BooksModule,
  ],
})
export class GatewayModule {}
