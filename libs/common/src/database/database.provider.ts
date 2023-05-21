import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const entities = [`dist/apps/**/apps/**/src/entities/*.entity.js`];
  const migrations = [`dist/apps/**/apps/**/src/migrations/*.js`];

  return {
    entities,
    migrations,
    keepConnectionAlive: true,
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    migrationsRun: true,
    logging: configService.get<string>('NODE_ENV') === 'development',
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
  };
};
