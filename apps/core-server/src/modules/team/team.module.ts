// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
import UserModule from '../user/user.module';
import TeamUserService from './service/team-user.service';
import TeamUserController from './controller/team-user.controller';
import TeamUser from './domain/team-user.entity';
import TeamUserRepository from './repository/team-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamUser]),
    TypeOrmExModule.forCustomRepository([TeamRepository, TeamUserRepository]),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => WorkspaceUserModule),
    forwardRef(() => UserModule),
    ClientsModule.registerAsync([
      {
        name: 'RMQ_PUSH_QUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RMQ_URL')],
            queue: configService.get<string>('RMQ_PUSH_QUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, TeamService, TeamUserService],
  controllers: [TeamController, TeamUserController],
  providers: [TeamService, TeamUserService],
})
export default class TeamModule {}
