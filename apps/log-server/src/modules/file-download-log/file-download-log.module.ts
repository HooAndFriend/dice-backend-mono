// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import FileDownloadLogController from './controller/file-download-log.controller';
import FileDownloadLogService from './service/file-download-log.service';
import FileDownloadLog from './domain/file-download-log.entity';
import FileDownloadLogRepository from './repository/file-download-log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileDownloadLog]),
    TypeOrmExModule.forCustomRepository([FileDownloadLogRepository]),
  ],
  providers: [FileDownloadLogService],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [FileDownloadLogController],
})
export default class FileDownloadLogModule {}
