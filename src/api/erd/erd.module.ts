// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from 'src/repository/typeOrmEx.module';
import Erd from './domain/erd.entity';
import ErdRepository from './repository/erd.repository';
import ErdController from './controller/erd.controller';
import ErdService from './service/erd.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Erd]),
    TypeOrmExModule.forCustomRepository([ErdRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [ErdController],
  providers: [ErdService],
})
export default class ErdModule {}
