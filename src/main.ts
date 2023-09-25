// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Express Imports
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filter/httpExceptionFilter';

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

  // ** Swagger Setting
  swaggerConfig(app);

  // ** Server ON Handler
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
