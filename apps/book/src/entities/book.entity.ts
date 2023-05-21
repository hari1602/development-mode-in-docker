import { AbstractEntity, BookDto } from '@app/common';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity extends AbstractEntity<BookDto> {
  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ default: false })
  purchased: boolean;

  dtoClass = BookDto;
}
