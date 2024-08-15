// ** Nest Imports
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import { SprintStatusEnum } from '../enum/sprint.enum';
import RequestSprintUpdateDto, {
  RequestSprintStatusUpdateDto,
} from '../dto/sprint.update.dto';
import TicketRepository from '../../ticket/repository/ticket.repository';
import { In } from 'typeorm';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import TicketService from '../../ticket/service/ticket.service';
import RequestSprintSaveTicketDto from '../dto/sprint.save.ticket.dto';
import Sprint from '../domain/sprint.entity';

@Injectable()
export default class SprintService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  private logger = new Logger(SprintService.name);

  /**
   * 스프린트 생성
   * @param RequestSprintSaveDto
   * @param workspace
   */
  public async saveSprint(dto: RequestSprintSaveDto, workspace: Workspace) {
    const orderId = await this.sprintRepository.count({
      where: {
        workspace: { workspaceId: workspace.workspaceId },
      },
    });

    await this.sprintRepository.save({
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
      status: dto.status,
      orderId: orderId,
      workspace: workspace,
    });
  }

  /**
   * 스프린트 수정
   * @param RequestSprintUpdateDto
   */
  public async updateSprint(dto: RequestSprintUpdateDto) {
    await this.sprintRepository.update(dto.sprintId, {
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
    });
  }

  /**
   * 스프린트 단일 조회
   * @param sprintId
   */
  public async findSprint(sprintId: number) {
    const findSprint = await this.sprintRepository.findOne({
      where: { sprintId: sprintId },
    });

    if (!findSprint) {
      throw new Error('Not Found Sprint');
    }

    return findSprint;
  }

  /**
   * 스프린트 전체 리스트 조회
   */
  public async findSprintList() {
    return this.sprintRepository.getSprintsWithTickets();
  }

  public async deleteSprint(sprintId: number) {
    await this.sprintRepository.delete(sprintId);
  }

  /**
   * 스프린트에서 하위 티켓 생성
   * @param RequestSprintSaveTicketDto
   * @param sprintId
   */
  public async saveTicketToSprint(
    dto: RequestSprintSaveTicketDto,
    sprintId: number,
  ) {
    const sprint = await this.sprintRepository.findOne({ where: { sprintId } });

    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    const tickets = await this.ticketRepository.findBy({
      ticketId: In(dto.ticketIds),
    });

    for (const ticket of tickets) {
      ticket.sprint = sprint;
    }

    await this.ticketRepository.save(tickets);
  }

  /**
   * 스프린트에서 하위 티켓 삭제
   * @param sprintId
   */
  public async deleteTicketInSprint(sprintId: number) {
    const sprint = await this.sprintRepository.findOne({
      where: { sprintId },
      relations: ['ticket'],
    });

    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    const ticketIds = sprint.ticket.map((ticket) => ticket.ticketId);

    if (ticketIds.length > 0) {
      await this.ticketRepository.update(
        { ticketId: In(ticketIds) },
        { sprint: null },
      );
    }

    sprint.ticket = [];

    await this.sprintRepository.save(sprint);
  }

  /**
   * 스프린트 Status 업데이트
   * @param RequestSprintStatusUpdateDto
   */
  public async updateSprintStatus(dto: RequestSprintStatusUpdateDto) {
    await this.sprintRepository.update(dto.sprintId, {
      status: dto.status,
    });
  }
}
