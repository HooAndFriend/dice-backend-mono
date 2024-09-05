// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import StateService from './service/state.service';
import StateController from './controller/state.controller';
import StateRepository from './repository/state.repository';

// ** entity Imports
import State from './domain/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
    TypeOrmExModule.forCustomRepository([StateRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, StateService],
  controllers: [StateController],
  providers: [StateService],
})
export default class StateModule {}
