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
import CommonResponse from '@/src/global/dto/api.response';

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

  // ** Find

  public async findTicketById(ticketId: number) {
    const findTicket = this.ticketRepository.findTicketById(ticketId);
    if (!findTicket) {
      throw new NotFoundException('Cannot Find Ticket.');
    }
    return findTicket;
  }

  public async findEpicById(epicId: number) {
    const findEpic = this.epicRepository.findEpicById(epicId);
    if (!findEpic) {
      throw new NotFoundException('Cannot Find Epic.');
    }
    return findEpic;
  }

  public async findCommentById(ticketId: number) {
    const findComment = this.ticketCommentRepository.findCommentById(ticketId);
    if (!findComment) {
      throw new NotFoundException('Cannot Find Comment.');
    }
    return findComment;
  }

  public async findSettingById(settingId: number) {
    const findSetting = this.ticketSettingRepository.findSettingById(settingId);
    if (!findSetting) {
      throw new NotFoundException('Cannot Find Setting.');
    }
    return findSetting;
  }

  // Ticket name 확인
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

  // ** Ticket 전체 조회
  public async findAllTicket(workspaceId: number) {
    const [ticket, count] =
      await this.ticketRepository.findAllTicketByWorkspaceId(workspaceId);

    return { ticket, count };
  }

  // ** Ticket 상세조회
  public async findOneTicket(id: number) {
    const ticket = await this.findTicketById(id);
    const [file, count] = await this.ticketFileRepository.findAllFileByTicketId(
      id,
    );
    ticket.file = file;
    return ticket;
  }

  // ** Ticket 저장
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

  // ** Ticket 수정
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

  // ** Ticket 삭제
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

  // ** Ticket 상태변경
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

  // ** Epic Service

  // Epic name 확인
  public async epicNameValidation(name: string, workspaceId: number) {
    if (name.length > 30) {
      throw new BadRequestException('Epic name max is 30');
    }

    const findEpicName = await this.epicRepository.findOneByNameAndWorkspaceId(
      name,
      workspaceId,
    );

    if (findEpicName) {
      throw new BadRequestException('Epic is already exist');
    }
  }

  // Epic 전체 조회
  public async findAllEpic(id: number) {
    return await this.epicRepository.findAllByWorkspaceId(id);
  }

  // Epic 상세 조회
  public async findOneEpic(id: number) {
    const findEpic = await this.findEpicById(id);
    return await this.ticketRepository.findAllTicketByEpicId(findEpic.id);
  }

  // ** Epic 저장
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

  // ** Epic 수정
  public async updateEpic(dto: RequestEpicUpdateDto) {
    const findEpic = await this.findEpicById(dto.epicId);

    await this.epicNameValidation(dto.name, findEpic.id);

    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });
  }

  // Epic 삭제
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

  // ** Comment  저장
  public async saveComment(dto: RequestTicketCommentSaveDto, user: User) {
    const findTicket = await this.findTicketById(dto.ticketId);

    const comment = this.ticketCommentRepository.create({
      user: user,
      content: dto.content,
      ticket: findTicket,
    });

    return await this.ticketCommentRepository.save(comment);
  }

  // ** Comment 수정
  public async updateComment(dto: RequestTicketCommentUpdateDto, user: User) {
    const findComment = await this.findCommentById(dto.commentId);

    await this.ticketCommentRepository.update(findComment.id, {
      content: dto.content,
    });
  }

  // ** Comment 삭제
  public async deleteComment(id: number) {
    const findComment = await this.findCommentById(id);

    await this.ticketCommentRepository.delete(id);
  }

  // ** Comment 조회
  public async findComment(id: number) {
    const findTicket = await this.findTicketById(id);

    return await this.ticketCommentRepository.findAllCommentByTicketId(id);
  }

  // ** Setting Service

  // ** Setting validation
  public async settingTypeValidation(type: string, workspaceId) {
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

  // ** Setting 저장
  public async saveSetting(
    dto: RequestSettingSaveDto,
    workspaceId: number,
    user: User,
  ) {
    await this.settingTypeValidation(dto.type, workspaceId);

    const workspace = await this.workspaceReposiotry.findOne({
      where: { id: workspaceId },
    });

    const setting = this.ticketSettingRepository.create({
      color: dto.color,
      description: dto.description,
      type: dto.type,
      admin: user,
      workspace,
    });

    return await this.ticketSettingRepository.save(setting);
  }

  // ** Setting 수정
  public async updateSetting(
    dto: RequestSettingUpdateDto,
    workspaceId: number,
  ) {
    const findSetting = await this.findSettingById(dto.settingId);

    await this.settingTypeValidation(dto.type, workspaceId);

    return this.ticketSettingRepository.update(dto.settingId, {
      type: dto.type,
      color: dto.color,
      description: dto.description,
    });
  }

  // ** Setting 삭제
  public async deleteSetting(id: number) {
    await this.findSettingById(id);

    return this.ticketSettingRepository.delete(id);
  }

  // ** Setting 조회
  public async findAllSetting(workspaceId: number) {
    return this.ticketSettingRepository.findSettingByWorkspaceId(workspaceId);
  }
}
