// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmExModule } from '@/src/global/repository/typeorm-ex.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import TicketHistoryLogController from './controller/ticket-history-log.controller';
import TicketHistoryLogService from './service/ticket-history-log.service';
import TicketHistoryLog from './domain/ticket-history-log.entity';
import TicketHistoryLogRepository from './repository/ticket-history-log.repository';
import InternalCoreModule from '../internal/internal-core/internal-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketHistoryLog]),
    TypeOrmExModule.forCustomRepository([TicketHistoryLogRepository]),
    forwardRef(() => InternalCoreModule),
  ],
  providers: [TicketHistoryLogService],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [TicketHistoryLogController],
})
export default class TicketHistoryLogModule {}
