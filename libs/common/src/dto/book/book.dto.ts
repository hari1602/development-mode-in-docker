import { AbstractDto } from '@app/common';
import { IsBoolean, IsString } from 'class-validator';

export class BookDto extends AbstractDto {
  @IsString()
  title: string;

  @IsString()
  subtitle?: string;

  @IsBoolean()
  purchased: boolean;
}
