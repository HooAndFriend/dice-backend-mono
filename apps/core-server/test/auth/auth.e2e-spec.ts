// ** Nest Imports
import { Test, TestingModule } from '@nestjs/testing';

// ** Custom Module Imports
import { AppModule } from '../../src/app.module';

// ** Utils Imports
import request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CustomExceptionFilter } from '../../src/global/filter/CustomExceptionFilter';

import csurf from 'csurf';
import helmet from 'helmet';

describe('Auth Module E2E TEST', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    // ** FIlter 개념
    app.useGlobalFilters(new CustomExceptionFilter());

    // ** Global Pipe Line
    app.useGlobalPipes(new ValidationPipe());

    // ** Cors Setting
    app.enableCors();
    if (process.env.NODE_ENV === 'prod') {
      app.use(csurf());
    }
    app.use(helmet());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('DICE LOGIN TEST POST /api/v1/auth', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth')
      .set('Accept', 'application/json')
      .type('application/json')
      .send({ username: 'admin', password: '1234' });

    expect(response.status).toBe(200);
  });
});
