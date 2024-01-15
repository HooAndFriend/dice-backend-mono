// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import CollectionService from './service/collection.service';
import CollectionController from './controller/collection.controller';
import CollectionRepository from './repository/collection.repository';
import Collection from './domain/collection.entity';
import WorkspaceRepository from '../workspace/repository/workspace.repository';
import RequestRepository from './repository/request.repository';
import Request from './domain/request.entity';
import RequestController from './controller/request.controller';
import RequestService from './service/request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, Request]),
    TypeOrmExModule.forCustomRepository([
      CollectionRepository,
      RequestRepository,
      WorkspaceRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [CollectionController, RequestController],
  providers: [CollectionService, RequestService],
})
export default class CollectionModule {}
