// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import AuthorityController from './controller/authority.controller';
import AuthorityService from './service/authority.service';
import Authority from './domain/authority.entity';
import AuthorityRepository from './repository/authority.repository';
import AdminRepository from '../admin/repository/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authority]),
    TypeOrmExModule.forCustomRepository([AuthorityRepository, AdminRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AuthorityController],
  providers: [AuthorityService],
})
export default class AuthorityModule {}
