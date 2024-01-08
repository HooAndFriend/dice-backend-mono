// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/comment.repository';
import QaRepository from '../repository/qa.repository';
import UserRepository from '@/src/api/user/repository/user.repository';

// ** Response Imports
import CommonResponse from '@/src/common/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestCommentSaveDto from '@/src/api/qa/dto/comment.save.dto'
import RequestQaCommentUpdateDto from '../dto/comment.update.dto';

@Injectable()
export default class CommentService {
  constructor(
    private readonly qacommentRepository: QaCommentRepository,
    private readonly qaRepository: QaRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  public async saveComment(dto: RequestCommentSaveDto) {
    const findQa = await this.qaRepository.findOne({
      where : {id : dto.qaId},
    });
    if(!findQa){
      return CommonResponse.createNotFoundException('QA를 찾을 수 없습니다.');
    }
    const findUser = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    await this.qacommentRepository.save(
      this.qacommentRepository.create({
        content : dto.content,
        user : findUser,
        qa : findQa,
      })
    )
    
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 생성합니다.',
    });
  }
  public async updateComment(dto : RequestQaCommentUpdateDto) {
    await this.qacommentRepository.update(dto.commentId, {
      content : dto.content,
    });
    
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 수정합니다.',
    });
  }
  public async deleteComment(commentid : number) {
    const findComment = await this.qacommentRepository.findOne({
      where : {id : commentid},
    });
    if(!findComment){
      return CommonResponse.createNotFoundException('댓글을 찾을 수 없습니다.');
    }
    await this.qacommentRepository.remove(findComment);
    
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
    });
  }
}
