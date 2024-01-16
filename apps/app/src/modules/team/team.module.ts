// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TeamService from './service/team.service';
import TeamController from './controller/team.controller';
import Team from './domain/team.entity';
import TeamRepository from './repository/team.repository';
import WorkspaceModule from '../workspace/workspace.module';
import WorkspaceUserModule from '../workspace-user/workspace-user.module';
import TeamUserModule from '../team-user/team-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmExModule.forCustomRepository([TeamRepository]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TeamUserModule),
    forwardRef(() => WorkspaceUserModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export default class TeamModule {}
