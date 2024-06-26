// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Entity Imports
import WorkspaceRepository from './repository/workspace.repository';
import WorkspaceService from './service/workspace.service';
import WorkspaceController from './controller/workspace.controller';
import Workspace from './domain/workspace.entity';
import TaskModule from '../task/task.module';
import WorkspaceFunction from './domain/workspace-function.entity';
import WorkspaceUser from './domain/workspace-user.entity';
import WorkspaceFunctionRepository from './repository/workspace-function.repository';
import WorkspaceUserRepository from './repository/workspace-user.repository';
import WorkspaceFunctionService from './service/workspace-function.service';
import WorkspaceUserService from './service/workspace-user.service';
import WorkspaceFunctionController from './controller/workspace-function.controller';
import WorkspaceUserController from './controller/workspace-user.controller';
import TicketModule from '../task/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceFunction, WorkspaceUser]),
    TypeOrmExModule.forCustomRepository([
      WorkspaceRepository,
      WorkspaceFunctionRepository,
      WorkspaceUserRepository,
    ]),
    forwardRef(() => TaskModule),
    forwardRef(() => TicketModule),
  ],
  exports: [
    TypeOrmExModule,
    TypeOrmModule,
    WorkspaceService,
    WorkspaceFunctionService,
    WorkspaceUserService,
  ],
  controllers: [
    WorkspaceController,
    WorkspaceFunctionController,
    WorkspaceUserController,
  ],
  providers: [WorkspaceService, WorkspaceFunctionService, WorkspaceUserService],
})
export default class WorkspaceModule {}
