// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import WorkspaceUserService from './service/workspace-user.service';
import WorkspaceUserController from './controller/workspace-user.controller';
import WorkspaceUser from './domain/workspace-user.entity';
import WorkspaceUserRepository from './repository/workspace-user.repository';
import WorkspaceModule from '../workspace/workspace.module';
import TeamUserModule from '../team-user/team-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceUser]),
    TypeOrmExModule.forCustomRepository([WorkspaceUserRepository]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TeamUserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [WorkspaceUserController],
  providers: [WorkspaceUserService],
})
export default class WorkspaceUserModule {}
