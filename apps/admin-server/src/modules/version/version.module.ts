// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';
import VersionService from './service/version.service';
import VersionController from './controller/version.controller';
import Version from './domain/version.entity';
import VersionRepository from './repository/version.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Version]),
    TypeOrmExModule.forCustomRepository([VersionRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [VersionController],
  providers: [VersionService],
})
export default class VersionModule {}
