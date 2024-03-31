// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import FileDownloadLogRepository from '../repository/file-download-log.repository';

@Injectable()
export default class FileDownloadLogService {
  constructor(
    private readonly fileDownloadLogRepository: FileDownloadLogRepository,
  ) {}
}
