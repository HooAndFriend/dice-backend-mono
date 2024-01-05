// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import QaService from './service/qa.service';
import Qa from './domain/qa.entity';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa]),
    TypeOrmExModule.forCustomRepository([QaRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [QaController],
  providers: [QaService],
})
export default class QaModule {}
