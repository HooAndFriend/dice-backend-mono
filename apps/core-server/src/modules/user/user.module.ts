// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import AuthController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import UserService from './service/user.service';
import TicketModule from '../ticket/ticket.module';
import WorkspaceModule from '../workspace/workspace.module';

// ** Entity Imports
import User from './domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    forwardRef(() => TicketModule),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, UserService],
  controllers: [AuthController],
  providers: [UserService],
})
export default class UserModule {}
