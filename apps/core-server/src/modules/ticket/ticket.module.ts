// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import TicketController from './controller/ticket.controller';
import TicketService from './service/ticket.service';
import EpicRepository from './repository/epic.repository';
import TicketRepository from './repository/ticket.repository';
import TicketFileRepository from './repository/ticket.file.repository';
import WorkspaceModule from '../workspace/workspace.module';
import TicketSettingRepository from './repository/ticket.setting.repository';
import TicketCommentRepository from './repository/ticket.comment.repository';

// ** entity Imports
import Epic from './domain/epic.entity';
import Ticket from './domain/ticket.entity';
import TicketFile from './domain/ticket.file.entity';
import UserModule from '../user/user.module';
import TicketComment from './domain/ticket.comment.entity';
import WorkspaceUserModule from '../workspace-user/workspace-user.module';
import TicketSetting from './domain/ticket.setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Epic,
      Ticket,
      TicketFile,
      TicketComment,
      TicketSetting,
    ]),
    TypeOrmExModule.forCustomRepository([
      EpicRepository,
      TicketRepository,
      TicketFileRepository,
      TicketCommentRepository,
      TicketSettingRepository,
    ]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => UserModule),
    forwardRef(() => WorkspaceUserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketService],
  controllers: [TicketController],
  providers: [TicketService],
})
export default class TicketModule {}
