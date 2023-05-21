import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern } from '@nestjs/microservices';
import { BookDto } from '@app/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('purchase_created')
  async handlePurchaseCreated(data: BookDto) {
    this.orderService.purchased(data);
  }
}
