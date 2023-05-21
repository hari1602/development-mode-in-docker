import { Controller, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import {
  BookDto,
  CreateBookInput,
  PurchaseBookInput,
  UpdateBookInput,
} from '@app/common';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}
  private readonly logger = new Logger(BookController.name);

  @MessagePattern({ app: 'book', cmd: 'create' })
  async create(
    @Payload() input: CreateBookInput,
    @Ctx() context: RedisContext,
  ): Promise<BookDto> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.create(input);
  }

  @MessagePattern({ app: 'book', cmd: 'findAll' })
  async findAll(@Ctx() context: RedisContext): Promise<BookDto[]> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.findAll();
  }

  @MessagePattern({ app: 'book', cmd: 'findOne' })
  async findOne(
    @Payload() id: string,
    @Ctx() context: RedisContext,
  ): Promise<BookDto> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.findOne(id);
  }

  @MessagePattern({ app: 'book', cmd: 'update' })
  async update(
    @Payload() { id, input }: { id: string; input: UpdateBookInput },
    @Ctx() context: RedisContext,
  ): Promise<BookDto> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.update(id, input);
  }

  @MessagePattern({ app: 'book', cmd: 'remove' })
  async remove(
    @Payload() id: string,
    @Ctx() context: RedisContext,
  ): Promise<BookDto> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.remove(id);
  }

  @MessagePattern({ app: 'book', cmd: 'purchase' })
  async purchase(
    @Payload() input: PurchaseBookInput,
    @Ctx() context: RedisContext,
  ): Promise<BookDto> {
    this.logger.log(`Channel: ${context.getChannel()}`);
    return this.bookService.purchase(input);
  }
}
