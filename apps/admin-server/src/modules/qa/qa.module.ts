// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import QaController from './controller/qa.controller';
import QaRepository from './repository/qa.repository';
import QaService from './service/qa.service';
import CommentService from './service/qa.comment.service';
import QaCommentRepository from './repository/qa.comment.repository';
import QaFileRepository from './repository/qa.file.repository';

// ** Entity Imports
import QaComment from './domain/qa.comment.entity';
import QaFile from './domain/qa.file.entity';
import Qa from './domain/qa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qa, QaComment, QaFile]),
    TypeOrmExModule.forCustomRepository([
      QaRepository,
      QaCommentRepository,
      QaFileRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, QaService, CommentService],
  controllers: [QaController],
  providers: [QaService, CommentService],
})
export default class QaModule {}
