// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import RequestService from './service/request.service';
import RequestController from './controller/request.controller';
import RequestRepository from './repository/request.repository';
import Request from './domain/request.entity';
import CollectionRepository from '../collection/repository/collection.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    TypeOrmExModule.forCustomRepository([
      RequestRepository,
      CollectionRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export default class RequestModule {}
