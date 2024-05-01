// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import { In } from 'typeorm';
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../../ticket/repository/ticket.repository';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import RequestSprintUpdateDto from '../dto/sprint.update.dto';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  public async saveSprint(dto: RequestSprintSaveDto) {
    const findTickets = await this.ticketRepository.findBy({ id: In(dto.ticketIds) });

    await this.sprintRepository.save(
      {
        name: dto.sprintName,
        startDate: dto.startDate,
        endDate: dto.endDate,
        orderId: dto.orderId,
        ticket: findTickets,
      }
    );
  }

  public async findSprint(sprintId: number) {
    const findSprint = await this.sprintRepository.findOne({
      where: {
        id: sprintId,
      },
    });

    if(!findSprint) {
      throw new Error('Not Found Sprint');
    }

    return findSprint;
  }

  public async updateSprint(dto: RequestSprintUpdateDto) {
    const findSprint = await this.findSprint(dto.sprintId);

    const findTickets = await this.ticketRepository.findBy({ id : In(dto.ticketIds)});

    findSprint.updateSprintFromDto(dto, findTickets);
  }

}
