// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import Board from './domain/board.entity';
import BoardRepository from './repository/board.repository';
import BoardController from './controller/board.controller';
import BoardService from './service/board.service';
import WorkspaceModule from '../workspace/workspace.module';
import UserModule from '../user/user.module';
import BoardContentRepository from './repository/content.repository';
import BoardBlockRepository from './repository/block.repository';
import BoardMentionRepository from './repository/mention.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([
      BoardRepository,
      BoardContentRepository,
      BoardBlockRepository,
      BoardMentionRepository
    ]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, BoardService],
  controllers: [BoardController],
  providers: [BoardService],
})
export default class BoardModule {}
