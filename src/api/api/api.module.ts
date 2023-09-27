// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeOrmEx.module';
import ApiService from './service/api.service';
import ApiController from './controller/api.controller';
import ApiRepository from './repository/api.repository';
import Api from './domain/api.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Api]),
    TypeOrmExModule.forCustomRepository([ApiRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export default class ApiModule {}
