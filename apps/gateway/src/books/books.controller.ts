import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  CreateBookInput,
  PurchaseBookInput,
  UpdateBookInput,
} from '@app/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() input: CreateBookInput) {
    return this.booksService.create(input);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateBookInput) {
    return this.booksService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Post('purchase')
  purchase(@Body() input: PurchaseBookInput) {
    return this.booksService.purchase(input);
  }
}
