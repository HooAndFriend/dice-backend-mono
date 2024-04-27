// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketSettingRepository from '../repository/ticket.setting.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@repo/common';

@Injectable()
export default class TicketSettingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketSettingRepository: TicketSettingRepository,
  ) {}

  private logger = new Logger(TicketSettingService.name);

  /**
   * Find Epic By Id
   * @param epicId
   * @returns
   */
  public async findTicketSettingById(ticketSettingId: number) {
    const ticketSetting = await this.ticketSettingRepository.findOne({
      where: { id: ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }
}
