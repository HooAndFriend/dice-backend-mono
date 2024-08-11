// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketLinkRepository from '../repository/ticket.link.repository';
import { NotFoundException } from '@hi-dice/common';

// ** enum, dto, entity, types Imports
import RequestTicketLinkSaveDto from '../dto/link.save.dto';
import TicketService from '../../ticket/service/ticket.service';

@Injectable()
export default class TicketLinkService {
  constructor(
    private readonly ticketLinkRepository: TicketLinkRepository,
    private readonly ticketService: TicketService,
  ) {}

  private logger = new Logger(TicketLinkService.name);

  /**
   * Save Ticket Link
   * @param dto
   */
  public async saveTicketLink(dto: RequestTicketLinkSaveDto) {
    const findParentTicket = await this.ticketService.findTicketById(
      dto.parentTicketId,
    );
    const findChildTicket = await this.ticketService.findTicketById(
      dto.childTicketId,
    );

    const ticketLink = this.ticketLinkRepository.create({
      parentTicket: findParentTicket,
      childTicket: findChildTicket,
    }); 

    return await this.ticketLinkRepository.save(ticketLink);
  }

  /**
   * Delete Ticket Link
   * @param linkId
   */
  public async deleteTicketLink(linkId: number) {
    const findLink = await this.findTicketLinkById(linkId);

    return await this.ticketLinkRepository.delete({ ticketLinkId: findLink.ticketLinkId });
  }

  /**
   * Find Ticket Link By Id
   * @param id
   */
  public async findTicketLinkById(id: number) {
    const findLink = await this.ticketLinkRepository.findOne({
      where: { ticketLinkId: id },
    });

    if (!findLink) {
      throw new NotFoundException('Not Found Ticket Link');
    }

    return findLink;
  }
}
