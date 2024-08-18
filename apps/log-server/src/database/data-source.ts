import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/module/**/*.entity.js'],
  synchronize: true,
  logging: true,
  logger: 'file',
  charset: 'utf8mb4_unicode_ci',
  timezone: '+09:00',
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
