// ** Nest Imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// ** Custom Module Imports
import LoggerMiddleware from './util/logger/logger.middleware';
import LoggerModule from './util/logger/logger.module';

// ** Typeorm Imports
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import ApiModule from './api/api.module';
import { TypeOrmExModule } from './repository/typeOrmEx.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
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
    TypeOrmExModule,
    LoggerModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
