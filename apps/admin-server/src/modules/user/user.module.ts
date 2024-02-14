// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import UserController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import UserService from './service/user.service';
import User from './domain/user.entity';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import TeamUserModule from '../team-user/team-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    TeamUserModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
