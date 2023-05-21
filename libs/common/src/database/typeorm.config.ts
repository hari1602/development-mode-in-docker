import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

const app = process.env.APP;

dotenv.config({ path: `apps/${app}/development.env` });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST === 'postgres' ? 'localhost' : process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`apps/${app}/src/entities/*.entity{.ts,.js}`],
  migrations: [`apps/${app}/src/migrations/*{.ts,.js}`],
});
