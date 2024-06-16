// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import SprintRepository from './repository/sprint.repository';
import SprintService from './service/sprint.service';
import SprintController from './controller/sprint.controller';

// ** entity Imports
import Sprint from './domain/sprint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sprint]),
    TypeOrmExModule.forCustomRepository([SprintRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, SprintService],
  controllers: [SprintController],
  providers: [SprintService],
})
export default class SprintModule {}
