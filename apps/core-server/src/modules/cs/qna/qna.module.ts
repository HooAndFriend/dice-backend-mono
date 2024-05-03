// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Entity Imports
import Qna from './domain/qna.entity';
import QnaRepository from './repository/qna.repository';
import QnaController from './controller/qna.controller';
import QnaService from './service/qna.service';
import CsCategoryModule from '../category/cs-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qna]),
    TypeOrmExModule.forCustomRepository([QnaRepository]),
    CsCategoryModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule, QnaService],
  controllers: [QnaController],
  providers: [QnaService],
})
export default class QnaModule {}
