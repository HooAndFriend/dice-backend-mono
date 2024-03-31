// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import FileDownloadLogRepository from '../repository/file-download-log.repository';
import RequestFileDownloadLogSaveDto from '../dto/file-download-log.save.dto';

@Injectable()
export default class FileDownloadLogService {
  constructor(
    private readonly fileDownloadLogRepository: FileDownloadLogRepository,
  ) {}

  /**
   * Save File Download Log
   * @param ip
   * @param dto
   */
  public async saveFileDownloadLog(
    ip: string,
    dto: RequestFileDownloadLogSaveDto,
  ) {
    await this.fileDownloadLogRepository.save(
      this.fileDownloadLogRepository.create({
        ip,
        type: dto.type,
      }),
    );
  }
}
