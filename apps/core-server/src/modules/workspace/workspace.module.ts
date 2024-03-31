// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import WorkspaceRepository from './repository/workspace.repository';
import WorkspaceService from './service/workspace.service';
import WorkspaceUserModule from '../workspace-user/workspace-user.module';
import WorkspaceController from './controller/workspace.controller';

// ** Entity Imports
import Workspace from './domain/workspace.entity';
import TeamModule from '../team/team.module';
import TeamUserModule from '../team-user/team-user.module';
import TicketModule from '../ticket/ticket.module';
import QaModule from '../qa/qa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    TypeOrmExModule.forCustomRepository([WorkspaceRepository]),
    forwardRef(() => WorkspaceUserModule),
    forwardRef(() => TeamModule),
    forwardRef(() => TeamUserModule),
    forwardRef(() => TicketModule),
    forwardRef(() => QaModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, WorkspaceService],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export default class WorkspaceModule {}
