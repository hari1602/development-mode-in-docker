import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from './constants/services';
import {
  BookDto,
  CreateBookInput,
  PurchaseBookInput,
  UpdateBookInput,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject(ORDER_SERVICE)
    private client: ClientProxy,
    @InjectRepository(BookEntity)
    private readonly repo: Repository<BookEntity>,
  ) {}

  async create(input: CreateBookInput): Promise<BookDto> {
    return this.repo.save(input);
  }

  async findAll(): Promise<BookDto[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<BookDto> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, input: UpdateBookInput): Promise<BookDto> {
    const result = await this.repo.preload({ id, ...input });
    return this.repo.save(result);
  }

  async remove(id: string): Promise<BookDto> {
    const result = await this.repo.findOneBy({ id });
    return this.repo.remove(result);
  }

  async purchase({ bookId }: PurchaseBookInput): Promise<BookDto> {
    const result = await this.repo.preload({ id: bookId, purchased: true });
    await this.repo.save(result);
    this.client.emit('purchase_created', result);
    return result;
  }
}
