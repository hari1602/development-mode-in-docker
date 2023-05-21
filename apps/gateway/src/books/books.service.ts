import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BOOK_SERVICE } from './constants/services';
import { Observable } from 'rxjs';
import {
  BookDto,
  CreateBookInput,
  PurchaseBookInput,
  UpdateBookInput,
} from '@app/common';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOK_SERVICE) private client: ClientProxy) {}
  private readonly app = 'book';

  async create(input: CreateBookInput): Promise<Observable<BookDto>> {
    const pattern = { app: this.app, cmd: 'create' };
    return this.client.send<BookDto>(pattern, input);
  }

  async findAll(): Promise<Observable<BookDto[]>> {
    const pattern = { app: this.app, cmd: 'findAll' };
    return this.client.send<BookDto[]>(pattern, {});
  }

  async findOne(id: string): Promise<Observable<BookDto>> {
    const pattern = { app: this.app, cmd: 'findOne' };
    return this.client.send<BookDto>(pattern, id);
  }

  async update(
    id: string,
    input: UpdateBookInput,
  ): Promise<Observable<BookDto>> {
    const pattern = { app: this.app, cmd: 'update' };
    return this.client.send<BookDto>(pattern, { id, input });
  }

  async remove(id: string): Promise<Observable<BookDto>> {
    const pattern = { app: this.app, cmd: 'remove' };
    return this.client.send<BookDto>(pattern, id);
  }

  async purchase(input: PurchaseBookInput): Promise<Observable<BookDto>> {
    const pattern = { app: this.app, cmd: 'purchase' };
    return this.client.send<BookDto>(pattern, input);
  }
}
