// ** Nest Imports
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// ** Custom Module Imports
import LoggerService from './global/util/logger/logger.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CustomExceptionFilter } from './global/filter/CustomExceptionFilter';
import { LoggingInterceptor } from './global/interceptor/LoggingInterceptor';
import PushModule from '@/src/modules/push.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
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
            host: process.env.DB_MASTER_HOST,
            port: +process.env.DB_MASTER_PORT,
            username: process.env.DB_MASTER_USERNAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_MASTER_DATABASE,
          },
        ],
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
    PushModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
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
