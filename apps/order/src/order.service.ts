import { BookDto } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  purchased(bookDto: BookDto) {
    this.logger.log(`${bookDto.title} is purchased!`);
  }
}
