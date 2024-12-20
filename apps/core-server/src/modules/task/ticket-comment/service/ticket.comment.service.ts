// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketService from '../../ticket/service/ticket.service';
import TicketCommentRepository from '../repository/ticket.comment.repository';
import BoardService from '@/src/modules/board/service/board.service';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import RequestTicketCommentSaveDto from '../dto/comment.save.dto';
import User from '@/src/modules/user/domain/user.entity';
import RequestTicketCommentUpdateDto from '../dto/comment.update.dto';
import TicketComment from '../domain/ticket.comment.entity';
import BoardTypeEnum from '@/src/modules/board/enum/board.type.enum';
import { Transactional } from 'typeorm-transactional';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';

@Injectable()
export default class TicketCommentService {
  constructor(
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly ticketService: TicketService,
    private readonly boardService: BoardService,
  ) {}

  private logger = new Logger(TicketCommentService.name);

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
   * 댓글 저장
   */
  @Transactional()
  public async saveComment(
    dto: RequestTicketCommentSaveDto,
    user: User,
    worksapce: Workspace,
  ): Promise<TicketComment> {
    const findTicket = await this.ticketService.findTicketById(dto.ticketId);

    const comment = this.ticketCommentRepository.create({
      user: user,
      content: dto.content,
      ticket: findTicket,
    });

    const ticketComment = await this.ticketCommentRepository.save(comment);
    await this.boardService.saveBoard(
      '',
      user.userId.toString(),
      worksapce,
      BoardTypeEnum.REPLY_BOARD,
      ticketComment.ticketCommentId,
    );

    return ticketComment;
  }

  /**
   * 댓글 수정
   */
  public async updateComment(
    dto: RequestTicketCommentUpdateDto,
    user: User,
  ): Promise<void> {
    await this.ticketCommentRepository.update(dto.commentId, {
      content: dto.content,
    });
  }

  /**
   * 댓글 삭제
   */
  public async deleteComment(ticketCommentId: number): Promise<void> {
    await this.ticketCommentRepository.delete(ticketCommentId);
  }

  /**
   * 티켓 도메인 조회
   */
  public async findCommentDomainById(
    commentId: number,
  ): Promise<TicketComment> {
    const comment = await this.ticketCommentRepository.findOne({
      where: { ticketCommentId: commentId },
      relations: ['ticket'],
    });

    if (!comment) {
      throw new NotFoundException('Not Found Comment');
    }

    return comment;
  }

  /**
   * 티켓 댓글 조회
   */
  public async findComment(id: number): Promise<[any[], number]> {
    const [data, count] =
      await this.ticketCommentRepository.findAllCommentByTicketId(id);

    const response = await Promise.all(
      data.map(async (comment) => {
        const board = await this.boardService.findOneBySubIdAndType(
          comment.ticketCommentId,
          BoardTypeEnum.REPLY_BOARD,
        );
        return {
          ...comment,
          board,
        };
      }),
    );

    return [response, count];
  }
}
