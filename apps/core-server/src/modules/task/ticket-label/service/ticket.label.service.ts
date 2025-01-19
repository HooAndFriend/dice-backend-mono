// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketLabelRepository from '../repository/ticket.label.repository';
import RequestLabelSaveDto from '../dto/label.save.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import TicketLabel from '../domain/ticket.label.entity';
import Optional from 'node-optional';
import { NotFoundException } from '@/src/global/exception/CustomException';
import { Transactional } from 'typeorm-transactional';
import RequestLabelUpdateDto from '../dto/label.update.dto';

// ** enum, dto, entity, types Imports

@Injectable()
export default class TicketLabelService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketLabelRepository: TicketLabelRepository,
  ) {}

  private logger = new Logger(TicketLabelService.name);

  /**
   * Label 저장
   */
  public async save(
    dto: RequestLabelSaveDto,
    workspace: Workspace,
  ): Promise<void> {
    await this.ticketLabelRepository.save(dto.toTicketLabel(workspace));
  }

  /**
   * Label 조회
   */
  public async findOne(ticketLabelId: number): Promise<TicketLabel> {
    const ticketLabel = await this.ticketLabelRepository.findOne({
      where: { ticketLabelId },
    });

    return Optional.of(ticketLabel).orElseThrow(
      NotFoundException,
      '해당 라벨이 존재하지 않습니다.',
    );
  }

  /**
   * 티켓 셋팅 수정
   */
  @Transactional()
  public async updateTicketLabel(
    dto: RequestLabelUpdateDto,
    workspace: Workspace,
  ): Promise<void> {
    for await (const item of dto.data) {
      if (item.labelId) {
        const ticketLabel = await this.findOne(item.labelId);
        ticketLabel.update(item);

        await this.ticketLabelRepository.save(ticketLabel);

        continue;
      }

      await this.ticketLabelRepository.save(
        this.ticketLabelRepository.create({
          name: item.name,
          description: item.description,
          bgColor: item.bgColor,
          color: item.color,
          workspace,
        }),
      );
    }
  }
}
