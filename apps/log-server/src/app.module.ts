// ** Nest Imports
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from './global/repository/typeorm-ex.module';
import LoggerService from './global/util/logger/logger.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import LogModule from '@/src/modules/log.module';
import { CustomExceptionFilter } from './global/filter/CustomExceptionFilter';
import { LoggingInterceptor } from './global/interceptor/LoggingInterceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
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
        };
      },
      async dataSourceFactory(option) {
        if (!option) throw new Error('Invalid options passed');

        return addTransactionalDataSource(new DataSource(option));
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
    TypeOrmExModule,
    LogModule,
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
