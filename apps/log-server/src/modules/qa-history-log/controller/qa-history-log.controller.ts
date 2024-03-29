// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import QaHistoryLogService from '../service/qa-history-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa-history-log', version: '1' })
export default class QaHistoryLogController {
  constructor(private readonly qaHistoryLogService: QaHistoryLogService) {}

  @MessagePattern('qa-history-log')
  async handleMessage(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {}
}
