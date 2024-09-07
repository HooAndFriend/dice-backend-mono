// ** Nest Imports
import { forwardRef, Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import AdminService from './service/admin.service';
import AdminController from './controller/admin.controller';
import AdminRepository from './repository/admin.repository';
import AuthorityRepository from './repository/authority.repository';
import AuthorityService from './service/authority.service';
import AuthorityController from './controller/authority.controller';
import AdminVersionController from './controller/version.controller';
import VersionModule from '../version/version.module';

// ** Entity Imports
import Admin from './domain/admin.entity';
import Authority from './domain/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Authority]),
    TypeOrmExModule.forCustomRepository([AdminRepository, AuthorityRepository]),
    forwardRef(() => VersionModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, AdminService, AuthorityService],
  controllers: [AdminController, AuthorityController, AdminVersionController],
  providers: [AdminService, AuthorityService],
})
export default class AdminModule {}
