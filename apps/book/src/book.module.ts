import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RedisModule } from '@app/common';
import { ORDER_SERVICE } from './constants/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [
    RedisModule.register({
      names: [ORDER_SERVICE],
    }),
    TypeOrmModule.forFeature([BookEntity]),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
      envFilePath: `./apps/book/${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
