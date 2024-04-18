// ** Nest Imports
import { Logger, VersioningType } from '@nestjs/common';
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

  // ** Base URL
  app.setGlobalPrefix('api/file');

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
  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap()
  .then((res) => {
    Logger.log(`AUTH SERVER START : ${process.env.SERVER_ENV}`);
  })
  .catch((error) => {
    Logger.error(`AUTH SERVER START FAILED : ${JSON.stringify(error)}`);
  });
