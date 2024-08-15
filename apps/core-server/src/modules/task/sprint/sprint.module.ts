// ** Nest Imports
import { forwardRef, Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';

// ** Custom Module Imports
import SprintRepository from './repository/sprint.repository';
import SprintService from './service/sprint.service';
import SprintController from './controller/sprint.controller';

// ** entity Imports
import Sprint from './domain/sprint.entity';
import WorkspaceModule from '../../workspace/workspace.module';
import UserModule from '../../user/user.module';
import TicketRepository from '../ticket/repository/ticket.repository';
import TicketService from '../ticket/service/ticket.service';
import TicketModule from '../ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sprint]),
    TypeOrmExModule.forCustomRepository([SprintRepository, TicketRepository]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, SprintService],
  controllers: [SprintController],
  providers: [SprintService],
})
export default class SprintModule {}
