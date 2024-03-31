// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import TicketHistoryLog from '../domain/ticket-history-log.entity';

@CustomRepository(TicketHistoryLog)
export default class TicketHistoryLogRepository extends Repository<TicketHistoryLog> {}
