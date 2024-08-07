// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import Epic from './domain/epic.entity';
import EpicService from './service/epic.service';
import EpicController from './controller/epic.controller';
import EpicRepository from './repository/epic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic]),
    TypeOrmExModule.forCustomRepository([EpicRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, EpicService],
  controllers: [EpicController],
  providers: [EpicService],
})
export default class EpicModule {}
