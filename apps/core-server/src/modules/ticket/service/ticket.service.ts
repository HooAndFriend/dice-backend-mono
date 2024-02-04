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

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketFileRepository: TicketFileRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
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

  public async findWorkspaceById(workspaceId: number) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id: workspaceId },
    });

    if (!findWorkspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    const [findTicket, count] =
      await this.ticketRepository.findAllTicketByWorkspaceId(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체조회 합니다.',
      data: { findTicket, count },
    });
  }

  // ** Ticket 상세 조회
  public async findOneTicket(id: number) {
    const findTicket = await this.ticketRepository.findTicketById(id);

    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 조회 합니다.',
      data: findTicket,
    });
  }

  // ** Ticket 저장
  public async saveTicket(dto: RequestTicketSaveDto, user: User) {
    const findEpic = await this.findEpicById(dto.epicId);

    if (!findEpic) {
      throw new NotFoundException('Not Found Epic');
    }

    if (dto.name.length > 30) {
      throw new BadRequestException('Ticket name max is 30');
    }

    const findTicket = await this.ticketRepository.findOne({
      where: { name: dto.name },
    });

    if (findTicket) {
      throw new BadRequestException('Existed Ticket');
    }

    await this.ticketRepository.save({
      admin: user,
      epic: findEpic,
      workspace: findEpic.workspace,
      name: dto.name,
      status: TicketStatus.ToDo,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  // ** Ticket 수정
  public async updateTicket(dto: RequestTicketUpdateDto, user: User) {
    const findTicket = await this.ticketRepository.findTicketById(dto.ticketId);
    console.log(findTicket);
    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }
    if (dto.name.length > 30) {
      throw new BadRequestException('Ticket Name max is 30');
    }
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
      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: 'Ticket을 수정합니다.',
      });
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
    const findTicket = await this.ticketRepository.findTicketById(id);
    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 티켓 삭제와 동시에 파일, 댓글 함께 삭제
      await queryRunner.manager.delete(TicketFile, { ticket: id });

      await queryRunner.manager.delete(TicketComment, { ticket: id });

      await queryRunner.manager.delete(Ticket, { id });

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: 'Ticket을 삭제합니다.',
      });
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
    const findTicket = await this.ticketRepository.findTicketById(dto.ticketId);
    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

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

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 상태를 변경합니다.',
    });
  }

  // ** Epic Service

  // Epic 전체 조회
  public async findAllEpic(id: number) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id },
    });

    if (!findWorkspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    const response = await this.epicRepository.findAllByWorkspaceId(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
      data: response,
    });
  }

  // Epic 상세 조회
  public async findOneEpic(id: number) {
    console.log(id);
    const findEpic = await this.epicRepository.findOne({
      where: { id },
    });

    if (!findEpic) {
      throw new NotFoundException('Not Found Epic');
    }

    const response = await this.ticketRepository.findAllTicketByEpicId(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 상세 조회합니다.',
      data: response,
    });
  }

  // ** Epic 저장
  public async saveEpic(dto: RequestEpicSaveDto, user: User) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    if (dto.name.length > 30) {
      throw new BadRequestException('Epic name max is 30');
    }

    const findEpic = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpic) {
      throw new BadRequestException('Existed Epic');
    }

    const [epics, count] = await this.epicRepository.findAllEpicByWorkspaceId(
      dto.workspaceId,
    );

    await this.epicRepository.save({
      admin: user,
      name: dto.name,
      workspace: findWorkspace,
      code: `${findWorkspace.name}-${count + 1}`,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    });
  }

  // ** Epic 수정
  public async updateEpic(dto: RequestEpicUpdateDto) {
    const findEpic = await this.epicRepository.findOne({
      where: { id: dto.epicId },
    });

    if (!findEpic) {
      throw new NotFoundException('Not Found Epic');
    }

    if (dto.name.length > 30) {
      throw new BadRequestException('Epic name max is 30');
    }

    const findEpicName = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpicName) {
      throw new BadRequestException('Existed Epic');
    }

    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  // Epic 삭제
  public async deleteEpic(id: number) {
    const findEpic = await this.epicRepository.findOne({
      where: { id },
    });
    if (!findEpic) {
      throw new NotFoundException('Not Found Epic');
    }
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
      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: 'Epic을 삭제합니다.',
      });
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
    const findTicket = await this.ticketRepository.findOne({
      where: { id: dto.ticketId },
    });

    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

    await this.ticketCommentRepository.save({
      user: user,
      content: dto.content,
      ticket: findTicket,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 생성합니다.',
    });
  }

  // ** Comment 수정
  public async updateComment(dto: RequestTicketCommentUpdateDto, user: User) {
    const findComment = await this.ticketCommentRepository.findOne({
      where: { id: dto.commentId },
    });

    if (!findComment) {
      throw new NotFoundException('Not Found Comment');
    }

    await this.ticketCommentRepository.update(findComment.id, {
      content: dto.content,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 수정합니다.',
    });
  }

  // ** Comment 삭제
  public async deleteComment(id: number) {
    const findComment = await this.ticketCommentRepository.findOne({
      where: { id },
    });

    if (!findComment) {
      throw new NotFoundException('Not Found Comment');
    }

    await this.ticketCommentRepository.delete(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
    });
  }

  // ** Comment 조회
  public async findComment(id: number) {
    const findTicket = await this.ticketRepository.findOne({ where: { id } });

    if (!findTicket) {
      throw new NotFoundException('Not Found Ticket');
    }

    const findComment =
      await this.ticketCommentRepository.findAllCommentByTicketId(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
      data: findComment,
    });
  }
}
