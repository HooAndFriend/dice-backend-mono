// ** Nest Imports
import { Logger, VersioningType } from '@nestjs/common';
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
import csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  // ** Server Container 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

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
  app.setGlobalPrefix('api');

  // ** Nest Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** Cors Setting
  app.enableCors();
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(csurf());
  //   app.use(helmet());
  // }

  // ** Swagger Setting
  if (configService.get('NODE_ENV') === 'development') {
    swaggerConfig(app);
  }

  // ** Server ON Handler
  await app.startAllMicroservices();
  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap()
  .then((res) => {
    Logger.log(`LOG SERVER START : ${process.env.SERVER_ENV}`);
  })
  .catch((error) => {
    Logger.error(`LOG SERVER START FAILED : ${JSON.stringify(error)}`);
  });
