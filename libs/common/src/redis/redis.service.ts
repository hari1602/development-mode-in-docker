import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): MicroserviceOptions {
    return {
      transport: Transport.REDIS,
      options: {
        host: this.configService.get<string>('REDIS_HOST'),
        password: this.configService.get<string>('REDIS_PASSWORD'),
        port: this.configService.get<number>('REDIS_PORT'),
        retryAttempts: 5,
        retryDelay: 1,
      },
    };
  }
}
