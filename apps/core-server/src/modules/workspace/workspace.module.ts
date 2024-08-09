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
import WorkspaceUser from './domain/workspace-user.entity';
import WorkspaceUserRepository from './repository/workspace-user.repository';
import WorkspaceUserService from './service/workspace-user.service';
import WorkspaceUserController from './controller/workspace-user.controller';
import TicketModule from '../task/ticket/ticket.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceUser]),
    TypeOrmExModule.forCustomRepository([
      WorkspaceRepository,
      WorkspaceUserRepository,
    ]),
    forwardRef(() => TaskModule),
    forwardRef(() => TicketModule),
    forwardRef(() => UserModule),
  ],
  exports: [
    TypeOrmExModule,
    TypeOrmModule,
    WorkspaceService,
    WorkspaceUserService,
  ],
  controllers: [WorkspaceController, WorkspaceUserController],
  providers: [WorkspaceService, WorkspaceUserService],
})
export default class WorkspaceModule {}
