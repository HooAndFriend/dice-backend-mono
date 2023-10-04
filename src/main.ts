// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Express Imports
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filter/httpExceptionFilter';

// ** Security Imports
import csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  // ** Server Container 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
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

  // ** FIlter 개념
  app.useGlobalFilters(new AllExceptionsFilter());

  // ** Global Pipe Line
  app.useGlobalPipes(new ValidationPipe());

  // ** Cors Setting
  app.enableCors();
  if (process.env.NODE_ENV === 'prod') {
    app.use(csurf());
  }
  app.use(helmet());

  // ** Swagger Setting
  if (process.env.NODE_ENV === 'dev') {
    swaggerConfig(app);
  }

  // ** Server ON Handler
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
