// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Entity Imports
import FaqService from './service/faq.service';
import FaqController from './controller/faq.controller';
import Faq from './domain/faq.entity';
import FaqRepository from './repository/faq.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faq]),
    TypeOrmExModule.forCustomRepository([FaqRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, FaqService],
  controllers: [FaqController],
  providers: [FaqService],
})
export default class FaqModule {}
