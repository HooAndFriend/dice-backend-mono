// ** Nest Imports
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import FileDownloadLogService from '../service/file-download-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports

@ApiTags('Qa History Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/file', version: '1' })
export default class FileDownloadLogController {
  constructor(
    private readonly fileDownloadLogService: FileDownloadLogService,
  ) {}
}
