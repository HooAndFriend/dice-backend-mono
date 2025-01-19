// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketLabelRepository from '../repository/ticket.label.repository';

// ** enum, dto, entity, types Imports

@Injectable()
export default class TicketLabelService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketLabelRepository: TicketLabelRepository,
  ) {}

  private logger = new Logger(TicketLabelService.name);
}
