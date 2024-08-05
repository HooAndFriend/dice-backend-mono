// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class TicketLinkService {
  constructor() {}

  private logger = new Logger(TicketLinkService.name);
}
