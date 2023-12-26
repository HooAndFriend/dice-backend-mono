// ** Nest Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { APP_INTERCEPTOR } from '@nestjs/core';

// ** Cache Imports
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

// ** Redis Imports
import * as redisStore from 'cache-manager-redis-store';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import ApiModule from '@/src/api/api.module';
import { TypeOrmExModule } from './repository/typeorm-ex.module';
import LoggerService from './util/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/api/**/*.entity.js'],
      synchronize: true,
      logging: true,
      logger: 'file',
      charset: 'utf8mb4_unicode_ci',
      timezone: '+09:00',
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    CacheModule.register({
      // store: redisStore,
      // host: process.env.REDIS_HOST,
      // port: +process.env.REDIS_PORT,
      isGlobal: true,
    }),
    TypeOrmExModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
