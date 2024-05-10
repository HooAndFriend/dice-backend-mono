// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketSettingRepository from '../repository/ticket.setting.repository';

// ** enum, dto, entity, types Imports
import { BadRequestException, NotFoundException } from '@hi-dice/common';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import Workspace from '../../workspace/domain/workspace.entity';

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

  /**
   * Save Setting
   * @param dto
   * @param workspace
   * @param user
   */
  public async saveSetting(dto: RequestSettingSaveDto, workspace: Workspace) {
    return await this.ticketSettingRepository.save(
      this.ticketSettingRepository.create({
        name: dto.name,
        description: dto.description,
        type: dto.type,
        workspace,
      }),
    );
  }

  /**
   * Existed Setting Type
   * @param type
   * @param workspaceId
   */
  public async existedTicketSetting(name: string, workspaceId: number) {
    const ticketSetting = await this.ticketSettingRepository.exist({
      where: { name, workspace: { id: workspaceId } },
    });

    if (ticketSetting) {
      throw new BadRequestException('Already exist setting');
    }
  }
}
