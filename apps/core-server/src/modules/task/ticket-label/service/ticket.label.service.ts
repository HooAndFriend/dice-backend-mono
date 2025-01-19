// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketLabelRepository from '../repository/ticket.label.repository';
import RequestLabelSaveDto from '../dto/label.save.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';

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
}
