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
import TicketSetting from '../domain/ticket.setting.entity';

@Injectable()
export default class TicketSettingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketSettingRepository: TicketSettingRepository,
  ) {}

  private logger = new Logger(TicketSettingService.name);

  /**
   * 티켓 셋팅 조회
   */
  public async findTicketSettingById(
    ticketSettingId: number,
  ): Promise<TicketSetting> {
    const ticketSetting = await this.ticketSettingRepository.findOne({
      where: { ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }

  /**
   * 티켓 셋팅 삭제
   */
  public async deleteTicketSetting(ticketSettingId: number): Promise<void> {
    await this.ticketSettingRepository.delete(ticketSettingId);
  }

  /**
   * 티켓 셋팅이 있는 지 조회
   */
  public async existedTicketSettingById(
    ticketSettingId: number,
  ): Promise<boolean> {
    const ticketSetting = await this.ticketSettingRepository.exist({
      where: { ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }

  /**
   * 모든 티켓 셋팅 조회
   */
  public async findAllSetting(
    workspaceId: number,
  ): Promise<[TicketSetting[], number]> {
    return await this.ticketSettingRepository.findSettingByWorkspaceId(
      workspaceId,
    );
  }

  /**
   * 티켓 셋팅 저장
   */
  public async saveTicketSetting(
    dto: RequestSettingSaveDto,
    workspace: Workspace,
  ): Promise<void> {
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
   * 티켓 셋팅 수정
   */
  @Transactional()
  public async updateTicketSetting(
    dto: RequestSettingUpdateDto,
    workspace: Workspace,
  ): Promise<void> {
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
