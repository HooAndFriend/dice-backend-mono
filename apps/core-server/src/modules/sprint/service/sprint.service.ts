// ** Nest Imports
import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import { In } from 'typeorm';
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../../ticket/repository/ticket.repository';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import RequestSprintUpdateInfoDto from '../dto/sprint.update.info.dto';
import { InternalServerErrorException } from '@hi-dice/common';
import Workspace from '../../workspace/domain/workspace.entity';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  private logger = new Logger(SprintService.name);

  /**
   * Save Sprint
   * @param dto
   * @param Workspace
   */
  public async saveSprint(dto: RequestSprintSaveDto, workspace: Workspace) {
    const orderId = await this.sprintRepository.count({
      where: {
        workspace: { id: workspace.id },
      },
    });

    await this.sprintRepository.save({
      name: dto.sprintName,
      startDate: dto.startDate,
      endDate: dto.endDate,
      workspace: workspace,
      orderId: orderId,
    });
  }
  /**
   * Find Sprint
   * @param sprintId
   * @param workspaceId
   */
  public async findSprint(sprintId: number, workspaceId: number) {
    const findSprint = await this.sprintRepository.findOne({
      where: {
        id: sprintId,
        workspace: { id: workspaceId },
      },
    });

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }

    return findSprint;
  }

  /**
   * Update Sprint
   * @param dto
   * @param workspace
   */
  public async updateSprintInfo(
    dto: RequestSprintUpdateInfoDto,
    workspace: Workspace,
  ) {
    const findSprint = await this.findSprint(dto.sprintId, workspace.id);

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }
    findSprint.name = dto.name;
    findSprint.startDate = new Date(dto.startDate); // Convert string to Date
    findSprint.endDate = new Date(dto.endDate); // Convert string to Date

    await this.sprintRepository.save(findSprint);
  }

  /**
   * Delete Sprint
   * @param sprintId
   */
  public async deleteSprint(sprintId: number) {
    await this.sprintRepository.delete(sprintId);
  }
}
