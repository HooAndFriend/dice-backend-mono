// ** Nest Imports
import { forwardRef, Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import SprintController from './controller/sprint.controller';
import SprintRepository from './repository/sprint.repository';
import TicketRepository from '../ticket/repository/ticket.repository';
import SprintService from './service/sprint.service';

// ** Entity Imports
import Sprint from './domain/sprint.entity';
import WorkspaceModule from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sprint]),
    TypeOrmExModule.forCustomRepository([SprintRepository, TicketRepository]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, SprintService],
  controllers: [SprintController],
  providers: [SprintService],
})
export default class SprintModule {}
