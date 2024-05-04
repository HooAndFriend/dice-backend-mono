// ** Nest Imports
import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';
import TicketRepository from '../repository/ticket.repository';
import { Between, DataSource, In } from 'typeorm';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint/sprint.save.dto';
import RequestSprintUpdateInfoDto from '../dto/sprint/sprint.update.info.dto';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSprintSaveTicketDto from '../dto/sprint/sprint.save.ticket.dto';
import RequestSprintUpdateOrderIdDto from '../dto/sprint/sprint.update.orderid.dto';
import Sprint from '../domain/sprint.entity';
import { InternalServerErrorException } from '@hi-dice/common';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly dataSource: DataSource,
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
   * Delete Ticket To Sprint
   * @param ticketId
   * @param Workspace
   */
  public async deleteTicketToSprint(ticketId: number, workspace: Workspace) {
    const findSprint = await this.sprintRepository.findOne({
      where: {
        ticket: { id: ticketId },
        workspace: { id: workspace.id },
      },
    });

    if (!findSprint) {
      throw new NotFoundException('Not Found Sprint');
    }

    const findTickets = await this.ticketRepository.find({
      where: {
        sprint: { id: findSprint.id },
        workspace: { id: workspace.id },
      },
    });

    findSprint.ticket = findTickets.filter((ticket) => ticket.id != ticketId);

    await this.sprintRepository.save(findSprint);
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
   * Update Sprint Order
   * @param dto
   * @param workspace
   */
  public async updateSprintOrder(
    dto: RequestSprintUpdateOrderIdDto,
    workspace: Workspace,
  ) {
    const findSprint = await this.findOneSprint(dto.sprintId, workspace.id);
    const targetSprint = await this.findOneSprint(
      dto.targetSprintId,
      workspace.id,
    );
    if (findSprint.orderId > targetSprint.orderId) {
      const list = await this.findMoreSprintList(
        findSprint.orderId,
        targetSprint.orderId,
        workspace.id,
      );

      await this.updateOrder(list, true, findSprint, targetSprint.orderId);
    } else {
      const list = await this.findLessSprintList(
        findSprint.orderId,
        targetSprint.orderId,
        workspace.id,
      );
      await this.updateOrder(list, false, findSprint, targetSprint.orderId);
    }
  }

  /**
   * Delete Sprint
   * @param sprintId
   */
  public async deleteSprint(sprintId: number) {
    await this.sprintRepository.delete(sprintId);
  }
  /**
   * Qa Update Order
   * @param epicList
   * @param isPluse
   * @param targetEpic
   * @param targetOrderId
   */
  private async updateOrder(
    sprintList: Sprint[],
    isPluse: boolean,
    targetSprint: Sprint,
    targetOrderId: number,
  ) {
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
   * Find Less Sprint List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findLessSprintList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.sprintRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { id: workspaceId },
      },
    });
  }

  /**
   * Find More Sprint List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findMoreSprintList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.sprintRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { id: workspaceId },
      },
    });
  }
}
