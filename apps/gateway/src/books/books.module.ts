import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { RedisModule } from '@app/common';
import { BOOK_SERVICE } from './constants/services';

@Module({
  imports: [
    RedisModule.register({
      names: [BOOK_SERVICE],
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
