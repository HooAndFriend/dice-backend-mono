// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaCommentRepository from '../repository/qa.comment.repository';

@Injectable()
export default class QaCommentService {
  constructor(
    private readonly qaCommentRepository: QaCommentRepository,
    private readonly configService: ConfigService,
  ) {}
}
