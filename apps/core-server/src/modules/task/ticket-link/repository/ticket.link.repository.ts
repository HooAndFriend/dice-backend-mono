// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** entity Imports
import TicketLink from '../domain/ticket.link.entity';

@CustomRepository(TicketLink)
export default class TicketLinkRepository extends Repository<TicketLink> {}
