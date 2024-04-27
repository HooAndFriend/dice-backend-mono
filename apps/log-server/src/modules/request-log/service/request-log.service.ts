import { Injectable } from '@nestjs/common';
import RequestLogRepository from '../repository/comment.repository';
import RequestLogDto from '../dto/request-log.dto';
import RequestLog from '../domain/request-log.entity';

@Injectable()
export default class RequestLogService {
  constructor(private readonly requestLogRepository: RequestLogRepository) {}

  /**
   * Save Request Log
   * @param dto
   */
  public async saveRequestLog(dto: RequestLogDto) {
    await this.requestLogRepository.save(this.getRequestLog(dto));
  }

  /**
   * Get Request Log
   * @param dto
   * @returns
   */
  private getRequestLog(dto: RequestLogDto) {
    const requestLog = new RequestLog();
    requestLog.serverName = dto.serverName;
    requestLog.requestMethod = dto.requestMethod;
    requestLog.requestParams = JSON.stringify(dto.requestParams);
    requestLog.requestUrl = dto.requestUrl;
    requestLog.requestBody = JSON.stringify(dto.requestBody);
    requestLog.responseBody = JSON.stringify(dto.responseBody);
    requestLog.ip = dto.ip ? dto.ip : '';
    requestLog.userId = dto.userId;

    return requestLog;
  }
}
