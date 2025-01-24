// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketLinkRepository from '../repository/ticket.link.repository';
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';

// ** enum, dto, entity, types Imports
import RequestTicketLinkSaveDto from '../dto/link.save.dto';
import TicketService from '../../ticket/service/ticket.service';
import RequestTicketLinkMultipleSaveDto from '../dto/link-multiple.save.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export default class TicketLinkService {
  constructor(
    private readonly ticketLinkRepository: TicketLinkRepository,
    private readonly ticketService: TicketService,
  ) {}

  private logger = new Logger(TicketLinkService.name);

  /**
   * 티켓 링크를 저장합니다.
   * @param dto
   * @returns
   */
  public async saveTicketLink(dto: RequestTicketLinkSaveDto) {
    const findParentTicket = await this.ticketService.findTicketById(
      dto.parentTicketId,
    );
    const findChildTicket = await this.ticketService.findTicketById(
      dto.childTicketId,
    );

    const isExistTicketLink = await this.isExistTicketLink(
      findParentTicket.ticketId,
      findChildTicket.ticketId,
    );

    if (isExistTicketLink) {
      throw new BadRequestException('Already Exist Ticket Link');
    }

    const ticketLink = this.ticketLinkRepository.create({
      parentTicket: findParentTicket,
      childTicket: findChildTicket,
    });

    return await this.ticketLinkRepository.save(ticketLink);
  }

  /**
   * 티켓 링크를 다중 저장합니다.
   */
  @Transactional()
  public async saveTicketLinkMultiple(dto: RequestTicketLinkMultipleSaveDto) {
    const findParentTicket = await this.ticketService.findTicketById(
      dto.parentTicketId,
    );

    const findChildTicketList = await this.ticketService.findAllById(
      dto.childTicketId,
    );

    // Promise.all로 병렬 처리
    await Promise.all(
      findChildTicketList.map(async (childTicket) => {
        const isExistTicketLink = await this.isExistTicketLink(
          findParentTicket.ticketId,
          childTicket.ticketId,
        );

        if (isExistTicketLink) {
          throw new BadRequestException('Already Exist Ticket Link');
        }

        const ticketLink = this.ticketLinkRepository.create({
          parentTicket: findParentTicket,
          childTicket,
        });
        await this.ticketLinkRepository.save(ticketLink);
      }),
    );
  }

  /**
   * 티켓 링크를 삭제합니다.
   * @param linkId
   * @returns
   */
  public async deleteTicketLink(linkId: number) {
    const findLink = await this.findTicketLinkById(linkId);

    await this.ticketLinkRepository.delete({
      ticketLinkId: findLink.ticketLinkId,
    });
  }

  /**
   * 티켓 링크를 조회합니다.
   * @param linkId
   * @returns TicketLink
   */
  public async findTicketLinkById(linkId: number) {
    const findLink = await this.ticketLinkRepository.findOne({
      where: { ticketLinkId: linkId },
    });

    if (!findLink) {
      throw new NotFoundException('Not Found Ticket Link');
    }

    return findLink;
  }
  /**
   * 티켓 링크가 존재하는지 확인합니다.
   * @param parentId
   * @param childId
   * @returns boolean
   */
  public async isExistTicketLink(
    parentTicketId: number,
    childTicketId: number,
  ) {
    const findLink = await this.ticketLinkRepository.findOne({
      where: { parentTicketId: parentTicketId, childTicketId: childTicketId },
    });

    return findLink ? true : false;
  }
}
