import { PartialType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBookInput {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;
}

export class UpdateBookInput extends PartialType(CreateBookInput) {}

export class PurchaseBookInput {
  @IsUUID()
  bookId: string;
}
