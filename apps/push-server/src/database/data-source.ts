import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import * as path from 'path';

const env = process.env.NODE_ENV || 'development';
config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/modules/**/*.entity.js'],
  synchronize: false,
  logging: true,
  logger: process.env.NODE_ENV === 'development' ? 'file' : 'file',
  timezone: 'Z',
  charset: 'utf8mb4_unicode_ci',
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
});
