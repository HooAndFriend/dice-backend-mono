// ** Nest Imports
import { Body, Controller, Ip, Post } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import FileDownloadLogService from '../service/file-download-log.service';

// ** Swagger Imports
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import RequestFileDownloadLogSaveDto from '../dto/file-download-log.save.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { FileDownloadLogResponse } from '@/src/global/response/file-download-log.response.ts';

// ** Dto Imports

@ApiTags('Qa History Log')
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
