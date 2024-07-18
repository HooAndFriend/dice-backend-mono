// ** Nest Imports
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

// ** Typeorm Imports
import { Between, DataSource, In, LessThan } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

// ** Custom Module Imports
import TicketRepository from '../repository/ticket.repository';
import TicketFileRepository from '../../ticket-file/repository/ticket.file.repository';
import TicketCommentRepository from '../../ticket-comment/repository/ticket.comment.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';

// ** enum, dto, entity, types Imports
import Ticket from '../domain/ticket.entity';
import { NotFoundException } from '@hi-dice/common';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import { TaskStatusEnum } from '@hi-dice/common';
import RequestTicketUserUpdateDto from '../dto/ticket/ticket.user.update.dto';
import RequestTicketStatusUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestSimpleTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketSimpleUpdateDto from '../dto/ticket/ticket-simple.update.dto';
import RequestTicketDeleteDto from '../dto/ticket/ticket.delete.dto';
import User from '@/src/modules/user/domain/user.entity';
import TicketSetting from '../../ticket-setting/domain/ticket.setting.entity';
import RequestWorkspaceTaskFindDto from '@/src/modules/workspace/dto/workspace-task.find.dto';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import TicketFile from '../../ticket-file/domain/ticket.file.entity';
import TicketComment from '../../ticket-comment/domain/ticket.comment.entity';

@Injectable()
export default class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly ticketFileRepository: TicketFileRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly userRepository: UserRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(TicketService.name);

  /**
   * Find Ticket by Id
   * @param ticketId
   */
  public async findTicketById(ticketId: number) {
    const findTicket = await this.ticketRepository.findOne({
      where: { ticketId },
    });

    if (!findTicket) {
      throw new NotFoundException('Cannot Find Ticket.');
    }

    return findTicket;
  }

  /**
   * 부모로 사용할 티켓 조회
   * @param ticketId
   * @returns Ticket
   */
  public async findParentTicketById(ticketId?: number) {
    if (!ticketId) {
      return null;
    }

    return await this.ticketRepository.findOne({
      where: { ticketId },
    });
  }

  /**
   * Find Ticket By Id With Worker And Admin
   * @param ticketId
   * @returns
   */
  public async findTicketByIdWithWorkerAndAdmin(ticketId: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { ticketId },
      relations: ['worker', 'admin'],
    });

    if (!ticket) {
      throw new NotFoundException('Not Found Ticket.');
    }

    return ticket;
  }

  /**
   * Update Ticket User
   * @param dto
   * @param user
   */
  public async updateTicketUser(dto: RequestTicketUserUpdateDto, user: User) {
    if (dto.type === 'admin') {
      await this.ticketRepository.update(dto.ticketId, { admin: user });
    } else {
      await this.ticketRepository.update(dto.ticketId, { worker: user });
    }
  }

  /**
   * Update Ticket Setting
   * @param ticketSetting
   * @param ticketId
   */
  public async updateTicketSetting(
    ticketSetting: TicketSetting,
    ticketId: number,
  ) {
    await this.ticketRepository.update(ticketId, { ticketSetting });
  }

  /**
   * Find Comment by Id
   * @param ticketId
   */
  public async findCommentById(ticketId: number) {
    const findComment = await this.ticketCommentRepository.findCommentById(
      ticketId,
    );
    if (!findComment) {
      throw new NotFoundException('Cannot Find Comment.');
    }
    return findComment;
  }

  /**
   * Verify ticket name
   * @param name
   * @param workspaceId
   */
  public async ticketNameValidation(name: string, workspaceId: number) {
    if (name.length > 30) {
      throw new BadRequestException('Max length of ticket name is 30');
    }

    const findTicketByName =
      await this.ticketRepository.findOneByNameAndWorkspaceId(
        name,
        workspaceId,
      );

    if (findTicketByName) {
      throw new BadRequestException('Ticket is already exist');
    }
  }

  /**
   * Find all tickets
   * @param workspaceId
   */
  public async findAllTicket(workspaceId: number) {
    return await this.ticketRepository.findAllTicketByWorkspaceId(workspaceId);
  }

  /**
   * 티켓을 ID로 상세 조회
   * @param id
   * @returns Ticket
   */
  public async findOneTicket(id: number) {
    const data = await this.ticketRepository.findTicketDetailById(id);

    if (!data) {
      throw new NotFoundException('Not Found Ticket');
    }

    return data;
  }

  /**
   * Save ticket
   * @param dto
   * @param user
   * @param workspace
   * @param ticketSetting
   * @param epic
   */
  public async saveTicket(
    dto: RequestSimpleTicketSaveDto,
    user: User,
    workspace: Workspace,
    ticketSetting: TicketSetting,
    parentTicket?: Ticket,
  ) {
    const ticketCount =
      (await this.ticketRepository.count({
        where: { workspace: { workspaceId: workspace.workspaceId } },
      })) + 1;

    const ticketNumber = workspace.code + '-' + ticketCount;

    return await this.ticketRepository.save(
      this.ticketRepository.create({
        admin: user,
        code: ticketNumber,
        workspace,
        name: dto.name,
        status: TaskStatusEnum.NOTHING,
        ticketSetting,
        parentTicket,
      }),
    );
  }

  /**
   * Update Simple Ticket
   * @param ticket
   * @param dto
   */
  public async updateSimpleTicket(
    ticket: Ticket,
    dto: RequestTicketSimpleUpdateDto,
  ) {
    if (dto.type === 'content') {
      ticket.content = dto.value;
    } else if (dto.type === 'name') {
      ticket.name = dto.value;
    } else if (dto.type === 'storypoint') {
      ticket.storypoint = dto.storypoint;
    }

    await this.ticketRepository.save(ticket);
  }

  /**
   * Update ticket due date
   * @param dto
   */
  public async updateTicketDueDate(dto: RequestTicketDueDateUpdateDto) {
    await this.ticketRepository.update(dto.ticketId, {
      dueDate: dto.dueDate,
    });
  }

  /**
   * Delete ticket
   * @param id
   */
  public async deleteTicket(id: number) {
    const findTicket = await this.findTicketById(id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 티켓 삭제와 동시에 파일, 댓글 함께 삭제
      await queryRunner.manager.delete(TicketFile, { ticket: id });

      await queryRunner.manager.delete(TicketComment, { ticket: id });
      findTicket.isDeleted = true;
      await queryRunner.manager.save(Ticket, findTicket);

      await queryRunner.commitTransaction();
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
   * Update Multi Ticket Status
   * @param ids
   * @param status
   */
  @Transactional()
  public async multiTicketStatusUpdate(ids: number[], status: TaskStatusEnum) {
    const now = new Date();

    if (status === TaskStatusEnum.REOPEN) {
      await this.ticketRepository.update(
        { ticketId: In(ids) },
        {
          status,
          reopenDate: now,
          completeDate: null,
        },
      );

      return;
    } else if (status === TaskStatusEnum.COMPLETE) {
      await this.ticketRepository.update(
        { ticketId: In(ids) },
        {
          status,
          completeDate: now,
        },
      );

      return;
    }

    await this.ticketRepository.update(
      { ticketId: In(ids) },
      {
        status,
      },
    );
  }

  /**
   * Update Multi Ticket Due Date
   * @param ids
   * @param dueDate
   */
  @Transactional()
  public async multiTicketDueDateUpdate(ids: number[], dueDate: string) {
    await this.ticketRepository.update({ ticketId: In(ids) }, { dueDate });
  }

  /**
   * Delete Tickets
   * @param dto
   */
  public async deleteTicketList(dto: RequestTicketDeleteDto) {
    await this.ticketRepository.delete({ ticketId: In(dto.ticketIds) });
  }

  /**
   * Update Multi Ticket Due Date
   * @param ids
   * @param dueDate
   */
  @Transactional()
  public async multiTicketSettingUpdate(
    ids: number[],
    ticketSetting: TicketSetting,
  ) {
    await this.ticketRepository.update(
      { ticketId: In(ids) },
      { ticketSetting },
    );
  }

  /**
   * Update ticket
   * @param dto
   */
  public async updateTicketStatus(dto: RequestTicketStatusUpdateDto) {
    const now = new Date();

    if (dto.status === TaskStatusEnum.REOPEN) {
      await this.ticketRepository.update(dto.ticketId, {
        status: dto.status,
        reopenDate: now,
        completeDate: null,
      });

      return;
    } else if (dto.status === TaskStatusEnum.COMPLETE) {
      await this.ticketRepository.update(dto.ticketId, {
        status: dto.status,
        completeDate: now,
      });

      return;
    }

    await this.ticketRepository.update(dto.ticketId, {
      status: dto.status,
    });
  }

  /**
   * Existed Ticket By Id
   * @param ticketId
   */
  public async isExistedTicketById(ticketId: number) {
    const ticket = await this.ticketRepository.exist({
      where: { ticketId },
    });

    if (!ticket) {
      throw new NotFoundException('Not Found Ticket');
    }
  }

  /**
   * Update Ticket Epic
   * @param epic
   * @param ticketId
   */
  public async updateTicketEpic(ticketId: number) {
    // await this.ticketRepository.update(ticketId, { epic });
  }

  /**
   * Update Ticket Order
   * @param ticket
   * @param targetOrderId
   * @param workspaceId
   */
  public async updateTicketOrder(
    ticket: Ticket,
    targetOrderId: number,
    workspaceId: number,
  ) {
    if (ticket.orderId > targetOrderId) {
      const list = await this.findMoreTicketList(
        ticket.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, true, ticket, targetOrderId);
    }

    if (ticket.orderId < targetOrderId) {
      const list = await this.findLessTicketList(
        ticket.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, false, ticket, targetOrderId);
    }
  }

  private async updateOrder(
    ticketList: Ticket[],
    isPluse: boolean,
    targetTicket: Ticket,
    targetOrderId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for await (const item of ticketList) {
        isPluse
          ? (item.orderId = item.orderId + 1)
          : (item.orderId = item.orderId - 1);

        await queryRunner.manager.save(item);
      }
      targetTicket.orderId = targetOrderId;
      queryRunner.manager.save(targetTicket);

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
   * Find More Ticket List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findLessTicketList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.ticketRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { workspaceId },
      },
    });
  }

  /**
   * Find Less Ticket List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findMoreTicketList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.ticketRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }
}
