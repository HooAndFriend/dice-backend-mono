// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from 'src/repository/typeOrmEx.module';
import CollectionService from './service/collection.service';
import CollectionController from './controller/collection.controller';
import CollectionRepository from './repository/collection.repository';
import Collection from './domain/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
    TypeOrmExModule.forCustomRepository([CollectionRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export default class CollectionModule {}
