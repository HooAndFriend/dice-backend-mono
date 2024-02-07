// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/comment.repository';
import QaRepository from '../repository/qa.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';

// ** Response Imports
import CommonResponse from '@/src/global/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestCommentSaveDto from '@/src/modules/qa/dto/comment.save.dto';
import RequestQaCommentUpdateDto from '../dto/comment.update.dto';
import QaService from './qa.service';
import User from '../../user/domain/user.entity';

@Injectable()
export default class CommentService {
  constructor(
    private readonly qacommentRepository: QaCommentRepository,
    private readonly qaRepository: QaRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly qaService: QaService,
  ) {}
  public async findQaComment(qaId: number, workspaceId : number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId, workspace : { id : workspaceId}},
    });
    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }
    const [data, count] = await this.qacommentRepository.findQaComment(qaId);

    return { data, count }
  }
  public async saveComment(dto: RequestCommentSaveDto, workspaceId : number, user : User) {
    const findQa = await this.qaRepository.findOne({
      where: { id: dto.qaId, workspace : { id : workspaceId }},
    });
    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }

    await this.qacommentRepository.save(
      this.qacommentRepository.create({
        content: dto.content,
        user: user,
        qa: findQa,
      }),
    );

    return 
  }
  public async updateComment(dto: RequestQaCommentUpdateDto, user : User) {
    await this.qacommentRepository.update({ id : dto.commentId, user : { id : user.id}}, {
      content: dto.content,
    });
    return 
  }
  public async deleteComment(commentid: number) {
    const findComment = await this.qacommentRepository.findOne({
      where: { id: commentid },
    });
    if (!findComment) {
      throw new NotFoundException('Not Found Comment');
    }
    await this.qacommentRepository.remove(findComment);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
    });
  }
}
