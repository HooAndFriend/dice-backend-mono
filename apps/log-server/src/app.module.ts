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
import { ClsModule } from 'nestjs-cls';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['X-Request-Id'] ?? uuidv4(),
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          entities: ['dist/modules/**/*.entity.js'],
          synchronize: false,
          logging: true,
          logger: process.env.NODE_ENV === 'development' ? 'file' : 'file',
          charset: 'utf8mb4_unicode_ci',
          timezone: '+09:00',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          migrations: ['dist/database/migrations/*.js'],
          migrationsTableName: 'migrations',
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
