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

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    TypeOrmExModule.forCustomRepository([AdminRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export default class AdminModule {}
