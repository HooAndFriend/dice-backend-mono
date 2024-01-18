// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import RequestLogService from './service/request-log.service';
import RequestLogController from './controller/request-log.controller';
import RequestLog from './domain/request-log.entity';
import RequestLogRepository from './repository/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestLog]),
    TypeOrmExModule.forCustomRepository([RequestLogRepository]),
  ],
  providers: [RequestLogService],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [RequestLogController],
})
export default class RequestLogModule {}
