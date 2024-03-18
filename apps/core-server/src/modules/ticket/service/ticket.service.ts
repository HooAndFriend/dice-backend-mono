// ** Nest Imports
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import TicketRepository from '../repository/ticket.repository';
import TicketFileRepository from '../repository/ticket.file.repository';
import TicketCommentRepository from '../repository/ticket.comment.repository';
import TicketSettingRepository from '../repository/ticket.setting.repository';

// ** Response Imports

// Other Imports

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import TicketFile from '../domain/ticket.file.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import { TicketStatus } from '@/src/global/enum/ticket.enum';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import UserRepository from '../../user/repository/user.repository';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';
import Ticket from '../domain/ticket.entity';
import Epic from '../domain/epic.entity';
import TicketComment from '../domain/ticket.comment.entity';
import RequestTicketStateUpdateDto from '../dto/ticket/ticket.state.update.dto';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';

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

  private logger = new Logger();

  /**
   * Find Ticket by Id
   * @param ticketId
   */
  public async findTicketById(ticketId: number) {
    const findTicket = this.ticketRepository.findTicketById(ticketId);
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
    const findEpic = this.epicRepository.findEpicById(epicId);
    if (!findEpic) {
      throw new NotFoundException('Cannot Find Epic.');
    }
    return findEpic;
  }

  /**
   * Find Comment by Id
   * @param ticketId
   */
  public async findCommentById(ticketId: number) {
    const findComment = this.ticketCommentRepository.findCommentById(ticketId);
    if (!findComment) {
      throw new NotFoundException('Cannot Find Comment.');
    }
    return findComment;
  }
  
  /**
   * Find Setting by Id
   * @param settingId
   */
  public async findSettingById(settingId: number) {
    const findSetting = this.ticketSettingRepository.findSettingById(settingId);
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
    const [data, count] = await this.ticketRepository.findAllTicketByWorkspaceId(workspaceId);
    return {data, count}
  }

  /**
   * Find one ticket
   * @param id
   */
  public async findOneTicket(id: number) {
    const data = await this.findTicketById(id);
    const [file, count] = await this.ticketFileRepository.findAllFileByTicketId(
      id,
    );
    data.file = file;
    return data;
  }

  /**
   * Save ticket
   * @param dto
   * @param user
   */
  public async saveTicket(dto: RequestTicketSaveDto, user: User) {
    const findEpic = await this.findEpicById(dto.epicId);

    if (dto.name.length > 30) {
      throw new BadRequestException('Max length of ticket name is 30');
    }

    const findTicketByName = await this.ticketRepository.findOne({
      where: { name: dto.name },
    });

    if (findTicketByName) {
      throw new BadRequestException('Ticket is already exist');
    }

    const ticket = this.ticketRepository.create({
      admin: user,
      epic: findEpic,
      workspace: findEpic.workspace,
      name: dto.name,
      status: TicketStatus.ToDo,
    });

    return await this.ticketRepository.save(ticket);
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

      await queryRunner.manager.delete(Ticket, { id });

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
  public async updateTicketState(dto: RequestTicketStateUpdateDto) {
    const findTicket = await this.findTicketById(dto.ticketId);

    const _date = new Date();
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const date = _date.getDate();

    switch (dto.status) {
      case TicketStatus.Reopen:
        await this.ticketRepository.update(findTicket.id, {
          status: dto.status,
          reopenDate: `${year}-${month}-${date}`,
        });
        break;

      case TicketStatus.Solved:
        await this.ticketRepository.update(findTicket.id, {
          status: dto.status,
          completeDate: `${year}-${month}-${date}`,
        });
        break;

      default:
        await this.ticketRepository.update(findTicket.id, {
          status: dto.status,
        });
    }
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
  public async findAllEpic(id: number) {
    const data = await this.epicRepository.findAllByWorkspaceId(id);

    const count = data.length
    
    return {data, count}
  }

  /**
   * Find Epic details
   * @param id
   */
  public async findOneEpic(id: number) {
    const findEpic = await this.findEpicById(id);
    const [data, count] = await this.ticketRepository.findAllTicketByEpicId(findEpic.id);
    return {data, count}
  }

  /**
   * Save Epic
   * @param dto
   * @param workspaceId
   * @param user
   */
  public async saveEpic(
    dto: RequestEpicSaveDto,
    workspaceId: number,
    user: User,
  ) {
    const workspace = await this.workspaceReposiotry.findWorkspace(workspaceId);

    await this.epicNameValidation(dto.name, workspace.id);

    const [epics, count] = await this.epicRepository.findAllEpicByWorkspaceId(
      workspaceId,
    );

    const epic = this.epicRepository.create({
      admin: user,
      name: dto.name,
      workspace: workspace,
      code: `${workspace.name}-${count + 1}`,
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

        await queryRunner.manager.delete(Ticket, { id: ticket.id });
      }

      await queryRunner.manager.delete(Epic, { id });
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
    const findTicket = await this.findTicketById(id);

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
   * Save Setting
   * @param dto
   * @param workspace
   * @param user
   */
  public async saveSetting(
    dto: RequestSettingSaveDto,
    workspace: Workspace,
    user: User,
  ) {
    await this.settingTypeValidation(dto.type, workspace.id);

    const setting = this.ticketSettingRepository.create({
      color: dto.color,
      description: dto.description,
      type: dto.type,
      admin: user,
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
    const findSetting = await this.findSettingById(dto.settingId);

    await this.settingTypeValidation(dto.type, workspace.id);

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
