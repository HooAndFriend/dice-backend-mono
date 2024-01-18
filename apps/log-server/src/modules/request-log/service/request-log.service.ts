import { Injectable } from '@nestjs/common';
import RequestLogRepository from '../repository/comment.repository';

@Injectable()
export default class RequestLogService {
  constructor(private readonly requestLogRepository: RequestLogRepository) {}
}
