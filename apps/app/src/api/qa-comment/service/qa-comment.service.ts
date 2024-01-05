// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/qa-comment.repository';

// ** Response Imports
import CommonResponse from '../../../common/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestQaUpdateDto from '../dto/qa-comment.update.dto';
import User from '../domain/qa-comment.entity';

@Injectable()
export default class QaService {
  constructor(
    private readonly qacommentRepository: QaCommentRepository,
    private readonly configService: ConfigService,
  ) {}

  public async updateQa(dto: RequestQaUpdateDto, user: User) {
    await this.qacommentRepository.update(user.id, {
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
  }

  public async findQa(user: User) {
    const findUser = await this.qacommentRepository.findUser(user.id);

    if (!findUser) {
      return CommonResponse.createNotFoundException(
        '유저 정보를 찾을 수 없습니다.',
      );
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }
}
