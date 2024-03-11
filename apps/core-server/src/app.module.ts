// ** Nest Imports
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';

// ** Cache Imports
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

// ** Redis Imports
import * as redisStore from 'cache-manager-redis-store';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from './global/repository/typeorm-ex.module';
import LoggerService from './global/util/logger/logger.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import CoreModule from '@/src/modules/core.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggingInterceptor } from './global/interceptor/LoggingInterceptor';
import { CustomExceptionFilter } from './global/filter/CustomExceptionFilter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: ['dist/modules/**/*.entity.js'],
      synchronize: true,
      logging: true,
      logger: 'file',
      charset: 'utf8mb4_unicode_ci',
      timezone: '+09:00',
      replication: {
        master: {
          host: process.env.DB_MASTER_HOST,
          port: +process.env.DB_MASTER_PORT,
          username: process.env.DB_MASTER_USERNAME,
          password: process.env.DB_MASTER_PASSWORD,
          database: process.env.DB_MASTER_DATABASE,
        },
        slaves: [
          {
            // host: process.env.DB_SLAVE_HOST,
            // port: +process.env.DB_SLAVE_PORT,
            // username: process.env.DB_SLAVE_USERNAME,
            // password: process.env.DB_SLAVE_PASSWORD,
            // database: process.env.DB_SLAVE_DATABASE,
            host: process.env.DB_MASTER_HOST,
            port: +process.env.DB_MASTER_PORT,
            username: process.env.DB_MASTER_USERNAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_MASTER_DATABASE,
          },
        ],
      },
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_LOG_QUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL')],
            queue: configService.get<string>('RMQ_LOG_QUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_CACHE_HOST,
      port: +process.env.REDIS_CACHE_PORT,
      isGlobal: true,
    }),
    TypeOrmExModule,
    CoreModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
