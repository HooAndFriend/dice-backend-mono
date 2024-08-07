// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketSettingRepository from '../repository/ticket.setting.repository';

// ** Typeorm Imports
import { Transactional } from 'typeorm-transactional';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import Workspace from '../../../workspace/domain/workspace.entity';
import RequestSettingUpdateDto from '../dto/setting.update.dto';
import RequestSettingSaveDto from '../dto/setting.save.dto';

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
      where: { ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }

  /**
   * Delete Ticket Setting
   * @param ticketSettingId
   */
  public async deleteTicketSetting(ticketSettingId: number) {
    await this.ticketSettingRepository.delete(ticketSettingId);
  }

  /**
   * Existed Ticket Setting By Id
   * @param ticketSettingId
   * @returns
   */
  public async existedTicketSettingById(ticketSettingId: number) {
    const ticketSetting = await this.ticketSettingRepository.exist({
      where: { ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }

  /**
   * Find all Setting
   * @param workspaceId
   */
  public async findAllSetting(workspaceId: number) {
    return await this.ticketSettingRepository.findSettingByWorkspaceId(
      workspaceId,
    );
  }

  /**
   * Save Ticket Setting
   * @param dto
   * @param workspace
   */
  public async saveTicketSetting(
    dto: RequestSettingSaveDto,
    workspace: Workspace,
  ) {
    await this.ticketSettingRepository.save(
      this.ticketSettingRepository.create({
        name: dto.name,
        description: dto.description,
        type: dto.type,
        workspace,
      }),
    );
  }

  /**
   * Update Ticket Setting
   * @param dto
   */
  @Transactional()
  public async updateTicketSetting(
    dto: RequestSettingUpdateDto,
    workspace: Workspace,
  ) {
    for await (const item of dto.data) {
      if (item.settingId) {
        const ticketSetting = await this.findTicketSettingById(item.settingId);
        ticketSetting.changeTicketSetting(item);

        await this.ticketSettingRepository.save(ticketSetting);

        continue;
      }

      await this.ticketSettingRepository.save(
        this.ticketSettingRepository.create({
          name: item.name,
          description: item.description,
          type: item.type,
          workspace,
        }),
      );
    }
  }
}
