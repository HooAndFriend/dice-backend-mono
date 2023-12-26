// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

// ** Custom Module Imports
import TeamService from './service/team.service';
import TeamController from './controller/team.controller';
import Team from './domain/team.entity';
import TeamRepository from './repository/team.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmExModule.forCustomRepository([TeamRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export default class TeamModule {}
