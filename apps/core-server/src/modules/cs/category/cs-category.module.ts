// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Entity Imports
import CsCategory from './domain/cs-category.entity';
import CsCategoryRepository from './repository/cs-category.repository';
import CsCategoryService from './service/cs-category.service';
import AdminCsCategoryController from './controller/admin.cs-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CsCategory]),
    TypeOrmExModule.forCustomRepository([CsCategoryRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, CsCategoryService],
  controllers: [AdminCsCategoryController],
  providers: [CsCategoryService],
})
export default class CsCategoryModule {}
