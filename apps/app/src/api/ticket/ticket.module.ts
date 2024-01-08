// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import TicketController from './controller/ticket.controller';
import TicketService from './service/ticket.service';
import EpicRepository from './repository/epic.repository';
import TicketRepository from './repository/ticket.repository';
import WorkspaceModule from '../workspace/workspace.module';

// ** entity Imports
import Epic from './domain/epic.entity';
import Ticket from './domain/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic, Ticket]),
    TypeOrmExModule.forCustomRepository([EpicRepository, TicketRepository]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export default class TicketModule {}
