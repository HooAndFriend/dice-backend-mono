// ** Nest Imports
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource, Equal, LessThan, Not } from 'typeorm';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import TicketRepository from '../repository/ticket.repository';
import TicketFileRepository from '../repository/ticket.file.repository';
import TicketCommentRepository from '../repository/ticket.comment.repository';
import TicketSettingRepository from '../repository/ticket.setting.repository';
import UserRepository from '../../user/repository/user.repository';

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import TicketFile from '../domain/ticket.file.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';
import Ticket from '../domain/ticket.entity';
import Epic from '../domain/epic.entity';
import TicketComment from '../domain/ticket.comment.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';
import RequestEpicDueDateUpdateDto from '../dto/epic/epic-duedate.dto';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import RequestEpicFindDto from '../dto/epic/epic.find.dto';
import { TaskStatusEnum } from '@/src/global/enum/TaskStatus.enum';
import RequestWorkspaceTaskFindDto from '../../workspace/dto/workspace-task.find.dto';
import RequestTicketUserUpdateDto from '../dto/ticket/ticket.user.update.dto';
import RequestTicketStatusUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestSimpleTicketSaveDto from '../dto/ticket/ticket-simple.save.dto';
import RequestTicketSimpleUpdateDto from '../dto/ticket/ticket-simple.update.dto';
import TicketSetting from '../domain/ticket.setting.entity';

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketFileRepository: TicketFileRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly ticketSettingRepository: TicketSettingRepository,
    private readonly workspaceReposiotry: WorkspaceRepository,
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
      where: { id: ticketId },
    });

    if (!findTicket) {
      throw new NotFoundException('Cannot Find Ticket.');
    }

    return findTicket;
  }

  /**
   * Find Epic by Id
   * @param epicId
   */
  public async findEpicById(epicId: number) {
    const findEpic = await this.epicRepository.findEpicById(epicId);
    if (!findEpic) {
      throw new NotFoundException('Cannot Find Epic.');
    }
    return findEpic;
  }

  /**
   * Find Ticket By Id With Worker And Admin
   * @param ticketId
   * @returns
   */
  public async findTicketByIdWithWorkerAndAdmin(ticketId: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
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
   * 티켓 카운트 조회
   * @param workspaceId
   * @returns
   */
  public async findTicketCount(workspaceId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ticketCount = await this.ticketRepository.count({
      where: { workspace: { id: workspaceId }, dueDate: LessThan(today) },
    });

    const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const yesterDayTicketCount = await this.ticketRepository.count({
      where: { workspace: { id: workspaceId }, dueDate: LessThan(oneDayAgo) },
    });

    return { ticketCount, yesterDayTicketCount };
  }

  /**
   * Find Ticket List By Date
   * @param workspaceId
   * @param userId
   * @param dto
   * @returns
   */
  public async findTicketListByDate(
    workspaceId: number,
    userId: number,
    dto: RequestWorkspaceTaskFindDto,
  ) {
    return await this.ticketRepository.findTicketListByDate(
      workspaceId,
      userId,
      dto,
    );
  }

  /**
   * 티켓 카운트 조회
   * @param workspaceId
   * @returns
   */
  public async findTicketDoneCount(workspaceId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ticketCount = await this.ticketRepository.count({
      where: {
        workspace: { id: workspaceId },
        status: TaskStatusEnum.COMPLETE,
      },
    });

    const yesterDayTicketCount = await this.ticketRepository.count({
      where: {
        workspace: { id: workspaceId },
        completeDate: LessThan(today),
        status: TaskStatusEnum.COMPLETE,
      },
    });

    return { ticketCount, yesterDayTicketCount };
  }

  /**
   * Find Setting by Id
   * @param settingId
   */
  public async findSettingById(settingId: number) {
    const findSetting = await this.ticketSettingRepository.findSettingById(
      settingId,
    );

    if (!findSetting) {
      throw new NotFoundException('Cannot Find Setting.');
    }

    return findSetting;
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
    const [data, count] =
      await this.ticketRepository.findAllTicketByWorkspaceId(workspaceId);
    return { data, count };
  }

  /**
   * Find one ticket
   * @param id
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
   */
  public async saveTicket(
    epic: Epic,
    dto: RequestTicketSaveDto,
    user: User,
    workspace: Workspace,
  ) {
    const ticketCount =
      (await this.ticketRepository.count({
        where: { workspace: { id: workspace.id } },
      })) + 1;
    const ticketNumber = workspace.code + '-' + ticketCount;

    await this.ticketRepository.save(
      this.ticketRepository.create({
        admin: user,
        epic,
        code: ticketNumber,
        workspace,
        name: dto.name,
        status: TaskStatusEnum.NOTHING,
      }),
    );
  }

  /**
   * Save ticket
   * @param dto
   * @param user
   */
  public async saveSimpleTicket(
    dto: RequestSimpleTicketSaveDto,
    user: User,
    workspace: Workspace,
  ) {
    const ticketCount =
      (await this.ticketRepository.count({
        where: { workspace: { id: workspace.id } },
      })) + 1;

    const ticketNumber = workspace.code + '-' + ticketCount;

    return await this.ticketRepository.save(
      this.ticketRepository.create({
        admin: user,
        code: ticketNumber,
        workspace,
        name: dto.name,
        status: TaskStatusEnum.NOTHING,
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
   * Update ticket
   * @param dto
   * @param user
   */
  public async updateTicket(dto: RequestTicketUpdateDto, user: User) {
    const findTicket = await this.findTicketById(dto.ticketId);

    await this.ticketNameValidation(dto.name, findTicket.workspace.id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(TicketFile, { ticket: dto.ticketId });

      dto.file.forEach(async (url) => {
        await this.ticketFileRepository.save({
          admin: user,
          ticket: findTicket,
          url,
        });
      });

      const findWorker = await this.userRepository.findOne({
        where: { id: dto.workerId },
      });
      if (!findWorker) {
        throw new NotFoundException('Not Found User');
      }
      await this.ticketRepository.update(dto.ticketId, {
        name: dto.name,
        content: dto.content,
        storypoint: dto.storypoint,
        dueDate: dto.dueDate,
        worker: findWorker,
      });
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
   * Update ticket due date
   * @param dto
   */
  public async updateTicketDueDate(dto: RequestTicketDueDateUpdateDto) {
    const findTicket = await this.findTicketById(dto.ticketId);

    await this.ticketRepository.update(findTicket.id, {
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
   * Find Ticket Count
   * @param userId
   * @returns
   */
  public async findMyTicketCount(userId: number) {
    return await this.ticketRepository.count({
      where: { worker: { id: userId } },
    });
  }

  // ** Epic Service

  /**
   * Verify Epic name
   * @param name
   * @param workspaceId
   */
  public async epicNameValidation(name: string, workspaceId: number) {
    if (name.length > 30) {
      throw new BadRequestException('Epic 이름은 최대 30자 입니다.');
    }

    const findEpicName = await this.epicRepository.findOneByNameAndWorkspaceId(
      name,
      workspaceId,
    );

    if (findEpicName) {
      throw new BadRequestException('Epic 이 이미 존재합니다');
    }
  }

  /**
   * Find All epic
   * @param id
   */
  public async findAllEpic(id: number, dto: RequestEpicFindDto) {
    const [data, count] = await this.epicRepository.findAllByWorkspaceId(
      id,
      dto,
    );

    return {
      data: data.map((item) => ({
        ...item,
        doneTicketCount: item.ticket.filter(
          (item) => item.status === TaskStatusEnum.COMPLETE,
        ).length,
      })),
      count,
    };
  }

  /**
   * Find Epic details
   * @param id
   */
  public async findOneEpic(id: number) {
    const findEpic = await this.findEpicById(id);
    const [data, count] = await this.ticketRepository.findAllTicketByEpicId(
      findEpic.id,
    );
    return { data, count };
  }

  /**
   * Save Epic
   * @param dto
   * @param workspaceId
   * @param user
   */
  public async saveEpic(
    dto: RequestEpicSaveDto,
    workspace: Workspace,
    user: User,
  ) {
    await this.epicNameValidation(dto.name, workspace.id);

    const epicCount =
      (await this.epicRepository.count({
        where: { workspace: { id: workspace.id } },
      })) + 1;
    const epicCode = workspace.code + '-' + epicCount;

    const epic = this.epicRepository.create({
      admin: user,
      name: dto.name,
      workspace: workspace,
      code: epicCode,
    });

    return await this.epicRepository.save(epic);
  }

  /**
   * Update Epic
   * @param dto
   */
  public async updateEpic(dto: RequestEpicUpdateDto) {
    const findEpic = await this.findEpicById(dto.epicId);

    await this.epicNameValidation(dto.name, findEpic.id);

    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });
  }

  /**
   * Update Due Date Epic
   * @param dto
   */
  public async updateEpicDueDate(dto: RequestEpicDueDateUpdateDto) {
    const findEpic = await this.findEpicById(dto.epicId);

    findEpic.dueDate = new Date(dto.dueDate);
    await this.epicRepository.save(findEpic);
  }

  /**
   * Delete Epic
   * @param id
   */
  public async deleteEpic(id: number) {
    const findEpic = await this.findEpicById(id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const [findTicket, count] =
        await this.ticketRepository.findAllTicketByEpicId(id);

      for (let i = 0; i < count; i++) {
        let ticket = findTicket[i];
        await queryRunner.manager.delete(TicketFile, { ticket: ticket.id });

        await queryRunner.manager.delete(TicketComment, { ticket: ticket.id });
        ticket.isDeleted = true;
        await queryRunner.manager.save(Ticket, ticket);
      }
      findEpic.isDeleted = true;
      await queryRunner.manager.save(Epic, findEpic);
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

  // ** Comment Service

  /**
   * Save Comment
   * @param dto
   * @param user
   */
  public async saveComment(dto: RequestTicketCommentSaveDto, user: User) {
    const findTicket = await this.findTicketById(dto.ticketId);

    const comment = this.ticketCommentRepository.create({
      user: user,
      content: dto.content,
      ticket: findTicket,
    });

    return await this.ticketCommentRepository.save(comment);
  }

  /**
   * Update Comment
   * @param dto
   * @param user
   */
  public async updateComment(dto: RequestTicketCommentUpdateDto, user: User) {
    const findComment = await this.findCommentById(dto.commentId);

    await this.ticketCommentRepository.update(findComment.id, {
      content: dto.content,
    });
  }

  /**
   * Delete Comment
   * @param id
   */
  public async deleteComment(id: number) {
    const findComment = await this.findCommentById(id);

    await this.ticketCommentRepository.delete(id);
  }

  /**
   * Find Comment
   * @param id
   */
  public async findComment(id: number) {
    return await this.ticketCommentRepository.findAllCommentByTicketId(id);
  }

  /**
   * Find My Ticket
   * @param teamId
   * @param month
   * @returns
   */
  public async findMyTeamTicketList(teamId: number, month: string) {
    return await this.ticketRepository.findMyTeamTicketList(teamId, month);
  }

  // ** Setting Service

  /**
   * Setting validation
   * @param type
   * @param workspaceId
   */
  public async settingTypeValidation(type: string, workspaceId: number) {
    const findSetting =
      await this.ticketSettingRepository.findOneByTypeAndWorkspaceId(
        type,
        workspaceId,
      );

    if (findSetting) {
      throw new BadRequestException('Setting is already exist');
    }

    return findSetting;
  }

  /**
   * Existed Ticket By Id
   * @param ticketId
   */
  public async isExistedTicketById(ticketId: number) {
    const ticket = await this.ticketRepository.exist({
      where: { id: ticketId },
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
  public async updateTicketEpic(epic: Epic, ticketId: number) {
    await this.ticketRepository.update(ticketId, { epic });
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
   * Save Setting
   * @param dto
   * @param workspace
   * @param user
   */
  public async saveSetting(dto: RequestSettingSaveDto, workspace: Workspace) {
    await this.settingTypeValidation(dto.type, workspace.id);

    const setting = this.ticketSettingRepository.create({
      color: dto.color,
      description: dto.description,
      type: dto.type,
      workspace,
    });

    return await this.ticketSettingRepository.save(setting);
  }

  /**
   * Update Setting
   * @param dto
   * @param workspace
   */
  public async updateSetting(
    dto: RequestSettingUpdateDto,
    workspace: Workspace,
  ) {
    const isDuplicationType = await this.ticketSettingRepository.findOne({
      where: {
        type: dto.type,
        id: Not(dto.settingId),
        workspace: Equal(workspace.id),
      },
    });

    if (isDuplicationType) {
      throw new BadRequestException('Setting type is already exist');
    }

    return this.ticketSettingRepository.update(dto.settingId, {
      type: dto.type,
      color: dto.color,
      description: dto.description,
    });
  }

  /**
   * Delete Setting
   * @param id
   */
  public async deleteSetting(id: number) {
    await this.findSettingById(id);

    return this.ticketSettingRepository.delete(id);
  }

  /**
   * Find all Setting
   * @param workspaceId
   */
  public async findAllSetting(workspaceId: number) {
    return await this.ticketSettingRepository.findSettingByWorkspaceId(
      workspaceId,
    );
  }
}
