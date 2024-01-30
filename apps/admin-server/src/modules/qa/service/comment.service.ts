// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/comment.repository';
import QaRepository from '../repository/qa.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';

// ** Response Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class CommentService {
  constructor(
    private readonly qacommentRepository: QaCommentRepository,
    private readonly configService: ConfigService,
  ) {}
}
