// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../repository/ticket.repository';
import { In } from 'typeorm';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint/sprint.save.dto';
import RequestSprintUpdateInfoDto from '../dto/sprint/sprint.update.info.dto';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSprintSaveTicketDto from '../dto/sprint/sprint.save.ticket.dto';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

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
      workspace: workspace,
      orderId: orderId + 1,
    });
  }

  /**
   * Save Sprint To Ticket
   * @param dto
   * @param Workspace
   */
  public async saveTicketToSprint(
    dto: RequestSprintSaveTicketDto,
    workspace: Workspace,
  ) {
    const findTicket = await this.ticketRepository.findOne({
      where: {
        id: dto.ticketId,
        workspace: { id: workspace.id },
      },
    });

    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

    const existTickets = await this.ticketRepository.find({
      where: {
        sprint: { id: dto.sprintId },
        workspace: { id: workspace.id },
      },
    });
    existTickets.push(findTicket);

    await this.sprintRepository.save({
      id: dto.sprintId,
      ticket: existTickets,
    });
  }

  /**
   * Find Sprint
   * @param sprintId
   * @param workspaceId
   */
  public async findOneSprint(sprintId: number, workspaceId: number) {
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
   * Find All Sprint
   * @param workspaceId
   */
  public async findSprintList(workspaceId: number) {
    const [data, count] = await this.sprintRepository.findSprintList(
      workspaceId,
    );

    if (!data) {
      throw new NotFoundException('Not Found Sprint');
    }

    return { data, count };
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
    const findSprint = await this.findOneSprint(dto.sprintId, workspace.id);

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }
    findSprint.name = dto.name;
    findSprint.startDate = new Date(dto.startDate);
    findSprint.endDate = new Date(dto.endDate);

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
