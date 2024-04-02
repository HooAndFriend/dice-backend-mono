// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import AdminService from './service/admin.service';
import AdminController from './controller/admin.controller';
import AdminRepository from './repository/admin.repository';
import Admin from './domain/admin.entity';
import AuthorityController from './controller/authority.controller';
import AuthorityService from './service/authority.service';
import Authority from './domain/authority.entity';
import AuthorityRepository from './repository/authority.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Authority]),
    TypeOrmExModule.forCustomRepository([AdminRepository, AuthorityRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AdminController, AuthorityController],
  providers: [AdminService, AuthorityService],
})
export default class AdminModule {}
