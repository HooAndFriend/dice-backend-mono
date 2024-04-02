// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TeamService from './service/team.service';
import TeamController from './controller/team.controller';
import TeamRepository from './repository/team.repository';
import WorkspaceModule from '../workspace/workspace.module';
import TeamUserService from './service/team-user.service';
import TeamUserController from './controller/team-user.controller';
import TeamUserRepository from './repository/team-user.repository';

// ** Entity Imports
import TeamUser from './domain/team-user.entity';
import Team from './domain/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamUser]),
    TypeOrmExModule.forCustomRepository([TeamRepository, TeamUserRepository]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TeamService, TeamUserService],
  controllers: [TeamController, TeamUserController],
  providers: [TeamService, TeamUserService],
})
export default class TeamModule {}
