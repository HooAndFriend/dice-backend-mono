// ** Nest Imports
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Entity Imports
import Qna from './domain/qna.entity';
import QnaRepository from './repository/qna.repository';
import QnaController from './controller/qna.controller';
import QnaService from './service/qna.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qna]),
    TypeOrmExModule.forCustomRepository([QnaRepository]),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_PUSH_QUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL')],
            queue: configService.get<string>('RMQ_PUSH_QUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [QnaController],
  providers: [QnaService],
})
export default class QnaModule {}
