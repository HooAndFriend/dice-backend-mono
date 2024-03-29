// ** Nest Imports
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import RequestLogService from '../service/request-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import RequestLogDto from '../dto/request-log.dto';

@ApiTags('Request Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/request-log', version: '1' })
export default class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  @MessagePattern('request-log')
  async handleMessage(
    @Payload() data: RequestLogDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.requestLogService.saveRequestLog(data);
  }
}
