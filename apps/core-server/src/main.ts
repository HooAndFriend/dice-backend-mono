// ** Nest Imports
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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

// ** Interceptor Imports
import { LoggingInterceptor } from './global/interceptor/LoggingInterceptor';

// ** Filter Imports
import { CustomExceptionFilter } from './global/filter/CustomExceptionFilter';

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

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'RMQ_SERVICE',
      queueOptions: {
        durable: false,
      },
    },
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** FIlter 개념
  app.useGlobalFilters(new CustomExceptionFilter());

  // ** Global Pipe Line
  app.useGlobalPipes(new ValidationPipe());

  // ** Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // ** Cors Setting
  app.enableCors();
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(csurf());
  //   app.use(helmet());
  // }

  // ** Swagger Setting
  if (process.env.NODE_ENV === 'development') {
    swaggerConfig(app);
  }

  // ** Server ON Handler
  await app.startAllMicroservices();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
