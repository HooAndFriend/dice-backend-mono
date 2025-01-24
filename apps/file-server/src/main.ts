// ** Nest Imports
import {
  Logger,
  ShutdownSignal,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './global/config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './global/util/logger/logger.service';

// ** Express Imports
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
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
  app.setGlobalPrefix('api/file');

  // ** Nest Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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
    Logger.log(`FILE SERVER START : ${process.env.SERVER_ENV}`);
  })
  .catch((error) => {
    Logger.error(`FILE SERVER START FAILED : ${JSON.stringify(error)}`);
  });
