// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import WorkspaceRepository from './repository/workspace.repository';
import WorkspaceService from './service/workspace.service';
import WorkspaceUserModule from '../workspace-user/workspace-user.module';
import WorkspaceController from './controller/workspace.controller';

// ** Entity Imports
import Workspace from './domain/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    TypeOrmExModule.forCustomRepository([WorkspaceRepository]),
    forwardRef(() => WorkspaceUserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export default class WorkspaceModule {}
