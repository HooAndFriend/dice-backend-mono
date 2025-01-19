// ** Nest Imports
import {
  Logger,
  ShutdownSignal,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './global/config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './global/util/logger/logger.service';

// ** Express Imports
import { NestExpressApplication } from '@nestjs/platform-express';

// ** Security Imports
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  // ** TypeORM Transactional Context
  initializeTransactionalContext();

  // ** Server Container 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  // ** Server Timeout 설정
  const server = app.getHttpServer();
  server.keepAliveTimeout = 61_000;
  server.headersTimeout = 65_000;

  // ** Shutdown Signal
  app.enableShutdownHooks([ShutdownSignal.SIGTERM]);

  const configService = app.get(ConfigService);

  // ** Base URL
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ** Nest Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** Cors Setting
  app.enableCors();

  // ** Swagger Setting
  if (
    configService.get('NODE_ENV') === 'development' ||
    configService.get('NODE_ENV') === 'local'
  ) {
    swaggerConfig(app);
  }

  // ** Server ON Handler
  await app.listen(configService.get<number>('SERVER_PORT'), () => {
    process.send?.('ready');
  });
}
bootstrap()
  .then((res) => {
    Logger.log(`CORE SERVER START : ${process.env.SERVER_ENV}`);
  })
  .catch((error) => {
    Logger.error(`CORE SERVER START FAILED : ${JSON.stringify(error)}`);
  });
