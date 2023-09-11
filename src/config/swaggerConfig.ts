// ** Nest Imoorts
import { INestApplication } from '@nestjs/common';

// ** Swagger Imports
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

const swaggerConfig = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('NestJS cms boilerplate')
    .setDescription('aiara-nestjs-cms-boilerplate')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
};

export default swaggerConfig;
