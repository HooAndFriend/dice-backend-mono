// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import TeamUserController from './controller/team-user.controller';
import TeamUserService from './service/team-user.service';
import TeamUserRepository from './repository/team-user.repository';
import TeamUser from './domain/team-user.entity';
import TeamModule from '../team/team.module';
import { MailModule } from '@/src/global/util/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamUser]),
    TypeOrmExModule.forCustomRepository([TeamUserRepository]),
    forwardRef(() => TeamModule),
    MailModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TeamUserController],
  providers: [TeamUserService],
})
export default class TeamUserModule {}
