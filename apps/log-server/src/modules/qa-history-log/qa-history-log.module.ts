// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import QaHistoryLog from './domain/qa-history-log.entity';
import QaHistoryLogRepository from './repository/qa-history-log.repository';
import QaHistoryLogService from './service/qa-history-log.service';
import QaHistoryLogController from './controller/qa-history-log.controller';
import InternalCoreModule from '../internal/internal-core/internal-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QaHistoryLog]),
    TypeOrmExModule.forCustomRepository([QaHistoryLogRepository]),
    forwardRef(() => InternalCoreModule),
  ],
  providers: [QaHistoryLogService],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [QaHistoryLogController],
})
export default class QaHistoryLogModule {}
