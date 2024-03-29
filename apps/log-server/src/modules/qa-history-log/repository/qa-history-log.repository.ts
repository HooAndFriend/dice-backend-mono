// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import QaHistoryLog from '../domain/qa-history-log.entity';

@CustomRepository(QaHistoryLog)
export default class QaHistoryLogRepository extends Repository<QaHistoryLog> {}
