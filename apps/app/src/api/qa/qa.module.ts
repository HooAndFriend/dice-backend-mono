// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import QaCommentRepository from './repository/comment.repository';
import QaService from './service/qa.service';
import CommentService from './service/comment.service';
import Qa from './domain/qa.entity';
import QaComment from './domain/comment.entity';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa, QaComment]),
    TypeOrmExModule.forCustomRepository([QaRepository, QaCommentRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [QaController],
  providers: [QaService,CommentService],
})
export default class QaModule {}
