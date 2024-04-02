// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import WorkspaceRepository from './repository/workspace.repository';
import WorkspaceService from './service/workspace.service';
import WorkspaceController from './controller/workspace.controller';

// ** Entity Imports
import WorkspaceUserService from './service/workspace-user.service';
import WorkspaceFunctionService from './service/workspace-function.service';
import WorkspaceFunctionController from './controller/workspace-function.controller';
import WorkspaceUserController from './controller/workspace-user.controller';
import WorkspaceFunctionRepository from './repository/workspace-function.repository';
import WorkspaceUserRepository from './repository/workspace-user.repository';

// ** Entity Imports
import Workspace from './domain/workspace.entity';
import WorkspaceFunction from './domain/workspace-function.entity';
import WorkspaceUser from './domain/workspace-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceFunction, WorkspaceUser]),
    TypeOrmExModule.forCustomRepository([
      WorkspaceRepository,
      WorkspaceFunctionRepository,
      WorkspaceUserRepository,
    ]),
  ],
  exports: [
    TypeOrmExModule,
    TypeOrmModule,
    WorkspaceService,
    WorkspaceUserService,
    WorkspaceFunctionService,
  ],
  controllers: [
    WorkspaceController,
    WorkspaceFunctionController,
    WorkspaceUserController,
  ],
  providers: [WorkspaceService, WorkspaceUserService, WorkspaceFunctionService],
})
export default class WorkspaceModule {}
