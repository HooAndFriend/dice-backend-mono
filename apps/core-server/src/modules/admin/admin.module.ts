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
import AdminTicketController from './controller/ticket.controller';
import TicketModule from '../task/ticket/ticket.module';
import AdminVersionController from './controller/version.controller';
import VersionModule from '../version/version.module';
import AdminCsCategoryController from './controller/cs-category.controller';
import CsCategoryModule from '../cs/category/cs-category.module';

// ** Entity Imports
import Admin from './domain/admin.entity';
import Authority from './domain/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Authority]),
    TypeOrmExModule.forCustomRepository([AdminRepository, AuthorityRepository]),
    forwardRef(() => TicketModule),
    forwardRef(() => VersionModule),
    forwardRef(() => CsCategoryModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, AdminService, AuthorityService],
  controllers: [
    AdminController,
    AuthorityController,
    AdminTicketController,
    AdminVersionController,
    AdminCsCategoryController,
  ],
  providers: [AdminService, AuthorityService],
})
export default class AdminModule {}
