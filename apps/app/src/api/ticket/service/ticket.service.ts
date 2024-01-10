// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
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
import CommonResponse from '@/src/common/dto/api.response';

// Other Imports

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import TicketFile from '../domain/ticket.file.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import { TicketStatus } from '@/src/common/enum/ticket.enum';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import UserRepository from '../../user/repository/user.repository';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';

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

  // ** Ticket Service

  // ** Ticket 저장
  public async saveTicket(dto: RequestTicketSaveDto, user: User) {
    const findEpic = await this.epicRepository.findEpicById(dto.epicId);

    if (!findEpic) {
      return CommonResponse.createNotFoundException(
        'Epic 정보를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Ticket 이름은 최대 30자 입니다.',
      );
    }

    const findTicket = await this.ticketRepository.findOne({
      where: { name: dto.name },
    });

    if (findTicket) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Ticket 입니다.',
      );
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
    // const findTicket = await this.ticketRepository.findTicketById(dto.ticketId);
    // if (!findTicket) {
    //   return CommonResponse.createNotFoundException(
    //     'Ticket 정보를 찾을 수 없습니다.',
    //   );
    // }
    // if (dto.name.length > 30) {
    //   return CommonResponse.createBadRequestException(
    //     'Ticket 이름은 최대 30자 입니다.',
    //   );
    // }
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const notChangedFile = [];
    //   dto.file.forEach(async (item) => {
    //     if (typeof item == 'string') {
    //       const file = await this.ticketFileRepository.save({
    //         admin: user,
    //         url: item,
    //         ticket: findTicket,
    //       });
    //     } else {
    //       notChangedFile.push(item);
    //     }
    //   });
    //   const [changedFile, count] =
    //     await this.ticketFileRepository.findAllChangedFileByTicketId(
    //       dto.ticketId,
    //       notChangedFile,
    //     );
    //   changedFile.forEach(async (file) => {
    //     await this.ticketFileRepository.delete({ id: file.id });
    //   });
    //   const findWorker = await this.userRepository.findOne({
    //     where: { id: dto.workerId },
    //   });
    //   if (!findWorker) {
    //     return CommonResponse.createNotFoundException(
    //       '해당 유저를 찾을 수 없습니다.',
    //     );
    //   }
    //   await this.ticketRepository.update(dto.ticketId, {
    //     name: dto.name,
    //     content: dto.content,
    //     storypoint: dto.storypoint,
    //     dueDate: dto.dueDate,
    //     worker: findWorker,
    //   });
    //   queryRunner.commitTransaction();
    //   return CommonResponse.createResponseMessage({
    //     statusCode: 200,
    //     message: 'Ticket을 수정합니다.',
    //   });
    // } catch (error) {
    //   this.logger.error(error);
    //   await queryRunner.rollbackTransaction();
    //   if (error instanceof HttpException) {
    //     throw new HttpException(error.message, error.getStatus());
    //   }
    //   throw new InternalServerErrorException('Internal Server Error');
    // } finally {
    //   await queryRunner.release();
    // }
  }

  // ** Epic Service

  // ** Epic 저장
  public async saveEpic(dto: RequestEpicSaveDto, user: User) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Epic 이름은 최대 30자 입니다.',
      );
    }

    const findEpic = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpic) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Epic 입니다.',
      );
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
      return CommonResponse.createNotFoundException(
        'Epic 정보를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Epic 이름은 최대 30자 입니다.',
      );
    }

    const findEpicName = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpicName) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Epic 입니다.',
      );
    }

    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  // ** Comment Service

  // ** Comment  저장
  public async saveComment(dto: RequestTicketCommentSaveDto, user: User) {
    const findTicket = await this.ticketRepository.findOne({
      where: { id: dto.ticketId },
    });

    if (!findTicket) {
      return CommonResponse.createNotFoundException(
        'Ticket 정보를 찾을 수 없습니다.',
      );
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
      return CommonResponse.createNotFoundException(
        '댓글 정보를 찾을 수 없습니다.',
      );
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
      return CommonResponse.createNotFoundException(
        '댓글 정보를 찾을 수 없습니다.',
      );
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
      return CommonResponse.createNotFoundException(
        'Ticket 정보를 찾을 수 없습니다.',
      );
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
