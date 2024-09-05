// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

// ** Utils Imports
import dayjs from 'dayjs';
import { Between, DataSource, In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

// ** Custom Module Imports
import EpicService from '../../epic/service/epic.service';
import TicketRepository from '../repository/ticket.repository';
import TicketCommentRepository from '../../ticket-comment/repository/ticket.comment.repository';
import WorkspaceUserService from '@/src/modules/workspace/service/workspace-user.service';

// ** enum, dto, entity, types Imports
import Ticket from '../domain/ticket.entity';
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import { TaskStatusEnum } from '@hi-dice/common';
import RequestTicketStatusUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestSimpleTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketSimpleUpdateDto from '../dto/ticket/ticket-simple.update.dto';
import RequestTicketDeleteDto from '../dto/ticket/ticket.delete.dto';
import User from '@/src/modules/user/domain/user.entity';
import TicketSetting from '../../ticket-setting/domain/ticket.setting.entity';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import TicketFile from '../../ticket-file/domain/ticket.file.entity';
import TicketComment from '../../ticket-comment/domain/ticket.comment.entity';

@Injectable()
export default class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly epicService: EpicService,
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly worksapceUserService: WorkspaceUserService,

    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(TicketService.name);

  /**
   * 티켓 ID로 조회
   */
  public async findTicketById(ticketId: number): Promise<Ticket> {
    const findTicket = await this.ticketRepository.findOne({
      where: { ticketId },
    });

    if (!findTicket) {
      throw new NotFoundException('Cannot Find Ticket.');
    }

    return findTicket;
  }

  /**
   * 티켓 ID로 조회 (Setting 포함)
   */
  public async findOne(ticketId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { ticketId },
      relations: ['ticketSetting'],
    });

    if (!ticket) {
      throw new NotFoundException('Not Found Ticket');
    }

    return ticket;
  }

  /**
   * 부모로 사용할 티켓 조회
   */
  public async findParentTicketById(ticketId?: number): Promise<Ticket | null> {
    if (!ticketId) {
      return null;
    }

    return await this.ticketRepository.findOne({
      where: { ticketId },
    });
  }

  /**
   * 티켓 ID로 조회 (Worker, Admin 포함)
   */
  public async findTicketByIdWithWorkerAndAdmin(
    ticketId: number,
  ): Promise<Ticket> {
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
   * 티켓 담당자 변경
   */
  public async updateTicketUser(
    ticket: Ticket,
    type: 'admin' | 'user',
    user: User,
  ): Promise<void> {
    if (type === 'admin') {
      ticket.changeAdmin(user);
    } else {
      ticket.changeWorker(user);
    }

    await this.ticketRepository.save(ticket);
  }

  /**
   * 티켓 타입 변경
   */
  public async updateTicketSetting(
    ticketSetting: TicketSetting,
    ticketId: number,
  ): Promise<void> {
    await this.ticketRepository.update(ticketId, { ticketSetting });
  }

  /**
   * 티켓 댓글 조회
   */
  public async findCommentById(ticketId: number): Promise<TicketComment> {
    const findComment = await this.ticketCommentRepository.findCommentById(
      ticketId,
    );
    if (!findComment) {
      throw new NotFoundException('Cannot Find Comment.');
    }
    return findComment;
  }

  /**
   * 티켓 이름 검증
   */
  public async ticketNameValidation(
    name: string,
    workspaceId: number,
  ): Promise<void> {
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
   * 모든 티켓 리스트 조회
   */
  public async findAllTicket(workspaceId: number): Promise<[Ticket[], number]> {
    return await this.ticketRepository.findAllTicketByWorkspaceId(workspaceId);
  }

  /**
   * 나의 티켓 리스트 조회
   */
  public async findMyTicketList(
    workspaceId: number,
    userId: number,
  ): Promise<[Ticket[], number]> {
    return await this.ticketRepository.findMyTicketList(workspaceId, userId);
  }

  /**
   * 티켓을 ID로 상세 조회
   */
  public async findOneTicket(id: number): Promise<Ticket> {
    const data = await this.ticketRepository.findTicketDetailById(id);

    if (!data) {
      throw new NotFoundException('Not Found Ticket');
    }

    return data;
  }

  /**
   * 통계 데이터 조회
   */
  public async findStats(workspaceId: number, userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ticketList = await this.ticketRepository.find({
      select: ['ticketId', 'status', 'dueDate', 'worker'],
      where: {
        workspace: { workspaceId },
        isDeleted: false,
      },
      relations: ['worker'],
    });

    const workspaceUserList =
      await this.worksapceUserService.findWorkspaceUserListByWorkspaceId(
        workspaceId,
      );

    console.log('workspaceUserList', workspaceUserList);

    const totalCount = ticketList.length;
    const totalDoneCount = ticketList.filter((ticket) =>
      [TaskStatusEnum.COMPLETE, TaskStatusEnum.DONE].includes(ticket.status),
    ).length;
    const myTicjetList = ticketList.filter(
      (ticket) => ticket.worker && ticket.worker.userId === userId,
    );
    const myCount = myTicjetList.length;
    const myDoneCount = myTicjetList.filter((ticket) =>
      [TaskStatusEnum.COMPLETE, TaskStatusEnum.DONE].includes(ticket.status),
    ).length;
    const myTodayCount = myTicjetList.filter(
      (item) => item.dueDate && dayjs(item.dueDate).isSame(today, 'day'),
    ).length;
    const myTodayDoneCount = myTicjetList
      .filter(
        (item) => item.dueDate && dayjs(item.dueDate).isSame(today, 'day'),
      )
      .filter((ticket) =>
        [TaskStatusEnum.COMPLETE, TaskStatusEnum.DONE].includes(ticket.status),
      ).length;

    const userList = workspaceUserList.map((workspaceUser) => ({
      userId: workspaceUser.user.userId,
      email: workspaceUser.user.email,
      nickname: workspaceUser.user.nickname,
      profile: workspaceUser.user.profile,
      ticketCount: ticketList.filter(
        (ticket) =>
          ticket.worker && ticket.worker.userId === workspaceUser.user.userId,
      ).length,
      ticketDoneCount: ticketList
        .filter(
          (ticket) =>
            ticket.worker && ticket.worker.userId === workspaceUser.user.userId,
        )
        .filter((ticket) =>
          [TaskStatusEnum.COMPLETE, TaskStatusEnum.DONE].includes(
            ticket.status,
          ),
        ).length,
    }));

    return {
      totalCount,
      totalDoneCount,
      userList,
      user: { myCount, myDoneCount, myTodayCount, myTodayDoneCount },
    };
  }

  /**
   * 티켓 저장
   */
  public async saveTicket(
    dto: RequestSimpleTicketSaveDto,
    user: User,
    workspace: Workspace,
    ticketSetting: TicketSetting,
  ): Promise<Ticket> {
    const ticketCount =
      (await this.ticketRepository.count({
        where: { workspace: { workspaceId: workspace.workspaceId } },
      })) + 1;

    const ticketNumber = workspace.code + '-' + ticketCount;

    if (dto.epicId) {
      const epic = await this.epicService.findOne(dto.epicId);

      return await this.ticketRepository.save(
        this.ticketRepository.create({
          admin: user,
          code: ticketNumber,
          workspace,
          name: dto.name,
          status: TaskStatusEnum.NOTHING,
          storypoint: 0,
          ticketSetting,
          epic,
        }),
      );
    }

    return await this.ticketRepository.save(
      this.ticketRepository.create({
        admin: user,
        code: ticketNumber,
        workspace,
        name: dto.name,
        status: TaskStatusEnum.NOTHING,
        storypoint: 0,
        ticketSetting,
      }),
    );
  }

  /**
   * 티켓 수정
   */
  public async updateSimpleTicket(
    ticket: Ticket,
    dto: RequestTicketSimpleUpdateDto,
  ): Promise<void> {
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
   * 티켓 듀데이트 변경
   */
  public async updateTicketDueDate(
    dto: RequestTicketDueDateUpdateDto,
  ): Promise<void> {
    await this.ticketRepository.update(dto.ticketId, {
      dueDate: dto.dueDate,
    });
  }

  /**
   * 티켓 삭제
   */
  public async deleteTicket(id: number): Promise<void> {
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
   * 티켓 상태 다중 변경
   */
  @Transactional()
  public async multiTicketStatusUpdate(
    ids: number[],
    status: TaskStatusEnum,
  ): Promise<void> {
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
   * 티켓 듀데이트 다중 변경
   */
  @Transactional()
  public async multiTicketDueDateUpdate(
    ids: number[],
    dueDate: string,
  ): Promise<void> {
    await this.ticketRepository.update({ ticketId: In(ids) }, { dueDate });
  }

  /**
   * 티켓 다중 삭제
   */
  public async deleteTicketList(dto: RequestTicketDeleteDto): Promise<void> {
    await this.ticketRepository.delete({ ticketId: In(dto.ticketIds) });
  }

  /**
   * 티켓 듀데이트 다중 변경
   */
  @Transactional()
  public async multiTicketSettingUpdate(
    ids: number[],
    ticketSetting: TicketSetting,
  ): Promise<void> {
    await this.ticketRepository.update(
      { ticketId: In(ids) },
      { ticketSetting },
    );
  }

  /**
   * 티켓 상태 변경
   */
  public async updateTicketStatus(
    dto: RequestTicketStatusUpdateDto,
  ): Promise<void> {
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
   * 티켓 있는 지 확인
   */
  public async isExistedTicketById(ticketId: number): Promise<void> {
    const ticket = await this.ticketRepository.exist({
      where: { ticketId },
    });

    if (!ticket) {
      throw new NotFoundException('Not Found Ticket');
    }
  }

  /**
   * 티켓의 에픽 변경
   */
  public async updateTicketEpic(ticketId: number): Promise<void> {
    // await this.ticketRepository.update(ticketId, { epic });
  }

  /**
   * 티켓 정렬 순서 변경
   */
  public async updateTicketOrder(
    ticket: Ticket,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<void> {
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

  /**
   * 티켓의 정렬 순서 변경
   */
  private async updateOrder(
    ticketList: Ticket[],
    isPluse: boolean,
    targetTicket: Ticket,
    targetOrderId: number,
  ): Promise<void> {
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
   * 티켓 리스트 조회
   */
  public async findLessTicketList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { workspaceId },
      },
    });
  }

  /**
   * 티켓 리스트 조회
   */
  public async findMoreTicketList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { workspaceId },
      },
    });
  }
}
