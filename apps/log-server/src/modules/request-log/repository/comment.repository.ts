// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import RequestLog from '../domain/request-log.entity';

@CustomRepository(RequestLog)
export default class RequestLogRepository extends Repository<RequestLog> {}
