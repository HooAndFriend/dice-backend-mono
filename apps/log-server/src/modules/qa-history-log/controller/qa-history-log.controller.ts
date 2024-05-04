// ** Nest Imports
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

// ** Module Imports
import QaHistoryLogService from '../service/qa-history-log.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { QaHistoryLogResponse } from '@/src/global/response/qa-history-log.response';

// ** Utils Imports
import JwtAccessGuard from '@/src/global/guard/auth.jwt-access.guard';

// ** Dto Imports
import { CommonResponse, RequestQaHistoryLogSaveDto } from '@hi-dice/common';

@ApiTags('Qa History Log')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa-history-log', version: '1' })
export default class QaHistoryLogController {
  constructor(private readonly qaHistoryLogService: QaHistoryLogService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qa 히스토리 리스트 조회' })
  @ApiResponse(QaHistoryLogResponse.findQaHistoryList[200])
  // @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findQaHistoryList(@Param('id') id: number) {
    const [data, count] = await this.qaHistoryLogService.findQaHistoryList(id);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Find Qa History List',
    });
  }

  @MessagePattern('qa-history-log')
  async handleMessage(
    @Payload() data: RequestQaHistoryLogSaveDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.qaHistoryLogService.saveQaHistoryLog(data);
  }
}
