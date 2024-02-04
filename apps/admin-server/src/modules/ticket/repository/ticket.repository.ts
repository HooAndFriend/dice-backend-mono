// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Ticket from '../domain/ticket.entity';

@CustomRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {}
