// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/comment.repository';

// ** Response Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class QaCommentService {
  constructor(
    private readonly qacommentRepository: QaCommentRepository,
    private readonly configService: ConfigService,
  ) {}
}
