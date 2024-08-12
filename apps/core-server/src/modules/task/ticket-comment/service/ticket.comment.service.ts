// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import TicketService from '../../ticket/service/ticket.service';
import TicketCommentRepository from '../repository/ticket.comment.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import RequestTicketCommentSaveDto from '../dto/comment.save.dto';
import User from '@/src/modules/user/domain/user.entity';
import RequestTicketCommentUpdateDto from '../dto/comment.update.dto';
import TicketComment from '../domain/ticket.comment.entity';

@Injectable()
export default class TicketCommentService {
  constructor(
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly ticketService: TicketService,
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
  public async saveComment(
    dto: RequestTicketCommentSaveDto,
    user: User,
  ): Promise<TicketComment> {
    const findTicket = await this.ticketService.findTicketById(dto.ticketId);

    const comment = this.ticketCommentRepository.create({
      user: user,
      content: dto.content,
      ticket: findTicket,
    });

    return await this.ticketCommentRepository.save(comment);
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
  public async findComment(id: number): Promise<[TicketComment[], number]> {
    return await this.ticketCommentRepository.findAllCommentByTicketId(id);
  }
}
