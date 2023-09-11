// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Express Imports
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filter/ExceptionFilter';

async function bootstrap() {
  // ** Server Container 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** FIlter 개념
  app.useGlobalFilters(new AllExceptionsFilter());

  // ** Global Pipe Line
  app.useGlobalPipes(new ValidationPipe());

  // ** Cors Setting
  app.enableCors();

  // ** Static Rouing
  app.use('/file', express.static('./uploads'));

  // ** View Setting
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');

  // ** Swagger Setting
  swaggerConfig(app);

  // ** Server ON Handler
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
