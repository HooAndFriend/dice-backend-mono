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

// ** TypeORM Transactional Context
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

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RMQ_URL')],
      queue: configService.get('RMQ_LOG_QUE'),
      queueOptions: {
        durable: false,
      },
    },
  });

  // ** Base URL
  app.setGlobalPrefix('api/log');

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
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('SERVER_PORT'), () => {
    process.send?.('ready');
  });
}
bootstrap()
  .then((res) => {
    Logger.log(`LOG SERVER START : ${process.env.SERVER_ENV}`);
  })
  .catch((error) => {
    Logger.error(`LOG SERVER START FAILED : ${JSON.stringify(error)}`);
  });
