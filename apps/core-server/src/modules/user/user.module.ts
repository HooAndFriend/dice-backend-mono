// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import UserController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import UserService from './service/user.service';
import TaskModule from '../task/task.module';
import WorkspaceModule from '../workspace/workspace.module';
import TicketModule from '../task/ticket/ticket.module';

// ** Entity Imports
import User from './domain/user.entity';
import AdminUserController from './controller/admin.user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    forwardRef(() => TaskModule),
    forwardRef(() => TicketModule),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, UserService],
  controllers: [UserController, AdminUserController],
  providers: [UserService],
})
export default class UserModule {}
