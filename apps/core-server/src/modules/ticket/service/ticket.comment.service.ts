// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports

import TicketCommentRepository from '../repository/ticket.comment.repository';

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';
import { NotFoundException } from '@hi-dice/common';
import TicketService from './ticket.service';

@Injectable()
export default class TicketCommentService {
  constructor(
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly ticketService: TicketService,
  ) {}

  private logger = new Logger(TicketCommentService.name);

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
   * Save Comment
   * @param dto
   * @param user
   */
  public async saveComment(dto: RequestTicketCommentSaveDto, user: User) {
    const findTicket = await this.ticketService.findTicketById(dto.ticketId);

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
    await this.ticketCommentRepository.update(dto.commentId, {
      content: dto.content,
    });
  }

  /**
   * Delete Comment
   * @param id
   */
  public async deleteComment(id: number) {
    await this.ticketCommentRepository.delete(id);
  }

  /**
   * Find Comment Domain By Id
   * @param commentId
   * @returns
   */
  public async findCommentDomainById(commentId: number) {
    const comment = await this.ticketCommentRepository.findOne({
      where: { id: commentId },
      relations: ['ticket'],
    });

    if (!comment) {
      throw new NotFoundException('Not Found Comment');
    }

    return comment;
  }

  /**
   * Find Comment
   * @param id
   */
  public async findComment(id: number) {
    return await this.ticketCommentRepository.findAllCommentByTicketId(id);
  }
}
