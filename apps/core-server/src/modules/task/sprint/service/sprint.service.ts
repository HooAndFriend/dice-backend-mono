// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { Between, DataSource, In } from 'typeorm';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../../ticket/repository/ticket.repository';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import { InternalServerErrorException } from '@hi-dice/common';

// ** enum, dto, entity, types Imports
import Sprint from '../domain/sprint.entity';
import RequestSprintSaveDto from '../dto/sprint.save.dto';
import RequestSprintUpdateDto, {
  RequestSprintStatusUpdateDto,
} from '../dto/sprint.update.dto';
import RequestSprintSaveTicketDto from '../dto/sprint.save.ticket.dto';

@Injectable()
export default class SprintService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(SprintService.name);

  /**
   * 스프린트 생성
   */
  public async saveSprint(
    dto: RequestSprintSaveDto,
    workspace: Workspace,
  ): Promise<void> {
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
   */
  public async updateSprint(dto: RequestSprintUpdateDto): Promise<void> {
    await this.sprintRepository.update(dto.sprintId, {
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      description: dto.description,
    });
  }

  /**
   * 스프린트 단일 조회
   */
  public async findSprint(sprintId: number): Promise<Sprint> {
    const findSprint = await this.sprintRepository.findOne({
      where: { sprintId: sprintId },
    });

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }

    return findSprint;
  }

  /**
   * 스프린트 전체 리스트 조회
   */
  public async findSprintList(): Promise<[Sprint[], number]> {
    return await this.sprintRepository.getSprintsWithTickets();
  }

  /**
   * 스프린트 삭제
   */
  public async deleteSprint(sprintId: number): Promise<void> {
    await this.sprintRepository.delete(sprintId);
  }

  /**
   * 스프린트에서 하위 티켓 생성
   */
  public async saveTicketToSprint(
    dto: RequestSprintSaveTicketDto,
    sprintId: number,
  ): Promise<void> {
    const sprint = await this.findSprint(sprintId);

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
   */
  public async deleteTicketInSprint(sprintId: number): Promise<void> {
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
   */
  public async updateSprintStatus(
    dto: RequestSprintStatusUpdateDto,
  ): Promise<void> {
    await this.sprintRepository.update(dto.sprintId, {
      status: dto.status,
    });
  }

  /**
   * 스프린트 순서 변경
   */
  public async updateSprintOrder(
    sprint: Sprint,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<void> {
    if (sprint.orderId > targetOrderId) {
      const list = await this.findMoreSprintList(
        sprint.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, false, sprint, targetOrderId);
    }
  }

  /**
   * 스프린트 정렬 순서 변경
   */
  private async updateOrder(
    sprintList: Sprint[],
    isPluse: boolean,
    targetSprint: Sprint,
    targetOrderId: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for await (const item of sprintList) {
        isPluse
          ? (item.orderId = item.orderId + 1)
          : (item.orderId = item.orderId - 1);

        await queryRunner.manager.save(item);
      }
      targetSprint.orderId = targetOrderId;
      queryRunner.manager.save(targetSprint);

      queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  /**
   * 스프린트 리스트 조회
   */
  public async findLessSprintList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Sprint[]> {
    return await this.sprintRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }

  /**
   * 스프린트 리스트 조회
   */
  public async findMoreSprintList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Sprint[]> {
    return await this.sprintRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }
}
