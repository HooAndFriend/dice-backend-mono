// ** Nest Imports
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

// ** Cache Imports
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

// ** Redis Imports
import * as redisStore from 'cache-manager-redis-store';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

// ** Custom Module Imports
import { TypeOrmExModule } from './global/repository/typeorm-ex.module';
import LoggerService from './global/util/logger/logger.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import CoreModule from '@/src/modules/core.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
    EventEmitterModule.forRoot(),
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
          poolSize: +process.env.DB_MAX_POOL_SIZE,
          extra: {
            connectionLimit: +process.env.DB_MAX_POOL_SIZE,
            connectTimeout: +process.env.DB_TIMEOUT,
            idleTimeout: +process.env.DB_IDLE_TIMEOUT,
            enableKeepAlive: true,
            keepAliveInitialDelay: +process.env.KEEP_ALIVE,
          },
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
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
