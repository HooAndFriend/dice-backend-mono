// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import UserController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import UserService from './service/user.service';
import TeamModule from '../team/team.module';
import WorkspaceModule from '../workspace/workspace.module';

// ** Entity Imports
import User from './domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    forwardRef(() => TeamModule),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
