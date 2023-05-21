import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { RedisService } from './redis.service';

interface RedisModuleOptions {
  names: string[];
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register({ names }: RedisModuleOptions): DynamicModule {
    const clients: ClientsModuleAsyncOptions = names.map((name) => ({
      name,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('REDIS_HOST'),
          password: configService.get<string>('REDIS_PASSWORD'),
          port: configService.get<number>('REDIS_PORT'),
          retryAttempts: 5,
          retryDelay: 1,
        },
      }),
      inject: [ConfigService],
    }));

    return {
      module: RedisModule,
      imports: [ClientsModule.registerAsync(clients)],
      exports: [ClientsModule],
    };
  }
}
