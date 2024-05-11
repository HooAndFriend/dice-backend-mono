// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/qa.comment.repository';
import QaRepository from '../repository/qa.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';

// ** enum, dto, entity, types Imports
import RequestCommentSaveDto from '@/src/modules/qa/dto/comment.save.dto';
import RequestQaCommentUpdateDto from '../dto/comment.update.dto';
import QaService from './qa.service';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Injectable()
export default class QaCommentService {
  constructor(
    private readonly qaCommentRepository: QaCommentRepository,
    private readonly qaService: QaService,
    private readonly configService: ConfigService,
  ) {}

  public async findQaComment(qaId: number, workspace: Workspace) {
    await this.qaService.findQa(qaId, workspace.id);
    const [data, count] = await this.qaCommentRepository.findQaComment(qaId);

    return { data, count };
  }

  /**
   * Find Comment By Id
   * @param commentId
   * @returns
   */
  public async findQaCommentById(commentId: number) {
    const comment = await this.qaCommentRepository.findOne({
      where: { id: commentId },
      relations: ['qa'],
    });

    if (!comment) {
      throw new NotFoundException('Not Found Comment');
    }

    return comment;
  }

  public async saveComment(
    dto: RequestCommentSaveDto,
    workspace: Workspace,
    user: User,
  ) {
    const findQa = await this.qaService.findQa(dto.qaId, workspace.id);
    await this.qaCommentRepository.save(
      this.qaCommentRepository.create({
        content: dto.content,
        user: user,
        qa: findQa,
      }),
    );

    return;
  }

  /**
   * Update Comment
   * @param dto
   * @param user
   */
  public async updateComment(dto: RequestQaCommentUpdateDto, user: User) {
    await this.qaCommentRepository.update(
      { id: dto.commentId, user: { id: user.id } },
      {
        content: dto.content,
      },
    );
  }

  /**
   * Delete Comment
   * @param commentid
   */
  public async deleteComment(commentId: number) {
    await this.qaCommentRepository.delete(commentId);
  }
}
