// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

// ** Custom Module Imports
import TeamUserController from './controller/team-user.controller';
import TeamUserService from './service/team-user.service';
import TeamUserRepository from './repository/team-user.repository';
import TeamUser from './domain/team-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamUser]),
    TypeOrmExModule.forCustomRepository([TeamUserRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TeamUserController],
  providers: [TeamUserService],
})
export default class TeamUserModule {}
