// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import CommentRepository from './repository/comment.repository';
import QaService from './service/qa.service';
import CommentService from './service/comment.service';
import Qa from './domain/qa.entity';
import Comment from './domain/comment.entity';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa, Comment]),
    TypeOrmExModule.forCustomRepository([QaRepository, CommentRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [QaController],
  providers: [QaService, CommentService],
})
export default class QaModule {}
