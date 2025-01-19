// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import TicketLabel from '../domain/ticket.label.entity';

@CustomRepository(TicketLabel)
export default class TicketLabelRepository extends Repository<TicketLabel> {}
