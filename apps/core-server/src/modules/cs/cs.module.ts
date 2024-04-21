// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Entity Imports
import FaqService from './service/faq.service';
import FaqController from './controller/faq.controller';
import Faq from './domain/faq.entity';
import FaqRepository from './repository/faq.repository';
import Qna from './domain/qna.entity';
import QnaRepository from './repository/qna.repository';
import QnaController from './controller/qna.controller';
import QnaService from './service/qna.service';
import CsCategory from './domain/cs-category.entity';
import CsCategoryRepository from './repository/cs-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faq, CsCategory, Qna]),
    TypeOrmExModule.forCustomRepository([
      FaqRepository,
      CsCategoryRepository,
      QnaRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [FaqController, QnaController],
  providers: [FaqService, QnaService],
})
export default class CsModule {}
