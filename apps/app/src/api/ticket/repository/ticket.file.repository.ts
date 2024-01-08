// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import TicketFile from '../domain/ticket.file.entity';

@CustomRepository(TicketFile)
export default class TicketFileRepository extends Repository<TicketFile> {}
