// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import AuthController from './controller/user.controller';
import UserRepository from './repository/user.repository';
import AuthService from './service/user.service';
import User from './domain/user.entity';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class UserModule {}
