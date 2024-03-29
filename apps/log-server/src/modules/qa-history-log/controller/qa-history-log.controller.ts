// ** Nest Imports
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import QaHistoryLogService from '../service/qa-history-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports
import RequestQaHistoryLogSaveDto from '../dto/qa-history-log.save.dto';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa-history-log', version: '1' })
export default class QaHistoryLogController {
  constructor(private readonly qaHistoryLogService: QaHistoryLogService) {}

  @MessagePattern('qa-history-log')
  async handleMessage(
    @Payload() data: RequestQaHistoryLogSaveDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.qaHistoryLogService.saveQaHistoryLog(data);
  }
}
