// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import AuthController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import AuthService from './service/user.service';
import User from './domain/user.entity';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import TeamUserModule from '../team-user/team-user.module';
import TicketModule from '../ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    forwardRef(() => TeamUserModule),
    forwardRef(() => TicketModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class UserModule {}
