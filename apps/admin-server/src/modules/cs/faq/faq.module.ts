// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Entity Imports
import FaqService from './service/faq.service';
import FaqController from './controller/faq.controller';
import Faq from './domain/faq.entity';
import FaqRepository from './repository/faq.repository';
import CsCategoryModule from '../category/cs-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faq]),
    TypeOrmExModule.forCustomRepository([FaqRepository]),
    forwardRef(() => CsCategoryModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [FaqController],
  providers: [FaqService],
})
export default class FaqModule {}
