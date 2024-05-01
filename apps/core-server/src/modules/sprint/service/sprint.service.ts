// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import { In } from 'typeorm';
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../../ticket/repository/ticket.repository';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import RequestSprintUpdateDto from '../dto/sprint.update.dto';
import { InternalServerErrorException } from '@repo/common';
import Workspace from '../../workspace/domain/workspace.entity';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  private logger = new Logger(SprintService.name);

  public async saveSprint(dto: RequestSprintSaveDto, workspace: Workspace) {
    const findTickets = await this.ticketRepository.findBy({
      id: In(dto.ticketIds),
      workspace: { id: workspace.id },
    });
    try {
      await this.sprintRepository.save({
        name: dto.sprintName,
        startDate: dto.startDate,
        endDate: dto.endDate,
        orderId: dto.orderId,
        ticket: findTickets,
        workspace: workspace,
      });
    } catch (error) {
      this.logger.log(error);

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  public async findSprint(sprintId: number, workspaceId: number) {
    const findSprint = await this.sprintRepository.findOne({
      where: {
        id: sprintId,
        workspace: { id: workspaceId },
      },
    });

    if (!findSprint) {
      throw new Error('Not Found Sprint');
    }

    return findSprint;
  }

  public async updateSprint(dto: RequestSprintUpdateDto, workspace: Workspace) {
    const findSprint = await this.findSprint(dto.sprintId, workspace.id);
    try {
      const findTickets = await this.ticketRepository.findBy({
        id: In(dto.ticketIds),
        workspace: { id: workspace.id },
      });

      findSprint.updateSprintFromDto(dto, findTickets);
    } catch (error) {
      this.logger.log(error);

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  public async deleteSprint(sprintId: number) {
    await this.sprintRepository.delete(sprintId);
  }
}
