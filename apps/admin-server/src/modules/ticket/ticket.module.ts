// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import TicketController from './controller/ticket.controller';
import TicketService from './service/ticket.service';
import EpicRepository from './repository/epic.repository';
import TicketRepository from './repository/ticket.repository';
import TicketFileRepository from './repository/ticket.file.repository';

// ** entity Imports
import Epic from './domain/epic.entity';
import Ticket from './domain/ticket.entity';
import TicketFile from './domain/ticket.file.entity';
import TicketComment from './domain/ticket.comment.entity';
import TicketCommentRepository from './repository/ticket.comment.repository';
import State from './domain/state.entity';
import StateRepository from './repository/state.repository';
import StateService from './service/state.service';
import StateController from './controller/state.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic, Ticket, TicketFile, TicketComment, State]),
    TypeOrmExModule.forCustomRepository([
      EpicRepository,
      TicketRepository,
      TicketFileRepository,
      TicketCommentRepository,
      StateRepository,
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TicketService, StateService],
  controllers: [TicketController, StateController],
  providers: [TicketService, StateService],
})
export default class TicketModule {}
