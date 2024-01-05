// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaCommentController from './controller/qa-comment.controller';
import QaCommentRepository from './repository/qa-comment.repository';
import QaCommentService from './service/qa-comment.service';
import QaComment from './domain/qa-comment.entity';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QaComment]),
    TypeOrmExModule.forCustomRepository([QaCommentRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [QaCommentController],
  providers: [QaCommentService],
})
export default class QaCommentModule {}
