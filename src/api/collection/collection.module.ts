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

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
    TypeOrmExModule.forCustomRepository([
      CollectionRepository,
      WorkspaceRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export default class CollectionModule {}
