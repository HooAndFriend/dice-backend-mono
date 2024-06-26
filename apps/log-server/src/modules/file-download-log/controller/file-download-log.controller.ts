// ** Nest Imports
import { Body, Controller, Ip, Post } from '@nestjs/common';

// ** Module Imports
import FileDownloadLogService from '../service/file-download-log.service';

// ** Swagger Imports
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { FileDownloadLogResponse } from '@/src/global/response/file-download-log.response.ts';

// ** Dto Imports
import RequestFileDownloadLogSaveDto from '../dto/file-download-log.save.dto';
import { CommonResponse } from '@hi-dice/common';

@ApiTags('File Download Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/file', version: '1' })
export default class FileDownloadLogController {
  constructor(
    private readonly fileDownloadLogService: FileDownloadLogService,
  ) {}

  @ApiOperation({ summary: '다운로드 기록 생성' })
  @ApiBody({ type: RequestFileDownloadLogSaveDto })
  @ApiResponse(FileDownloadLogResponse.saveFileDownloadLog[200])
  @Post('/')
  public async saveFileDownloadLog(
    @Ip() ip: string,
    @Body() dto: RequestFileDownloadLogSaveDto,
  ) {
    await this.fileDownloadLogService.saveFileDownloadLog(ip, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'File Download Log Saved Successfully',
    });
  }
}
