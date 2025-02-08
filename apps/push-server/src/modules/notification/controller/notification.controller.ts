// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Sse,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import NotificationService from '../service/notification.service';
import SSEService from '../service/sse.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { CommonResponse } from '@hi-dice/common';
import { NotificationResponse } from '@/src/global/response/notification.response';

// ** Utils Imports
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { Observable } from 'rxjs';
import { SseJwtGuard } from '../../auth/passport/auth.jwt-sse-access.guard';
import SendSSEMessageDto from '../dto/sse-send.dto';

// ** Dto Imports

@ApiTags('Notification')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/notification', version: '1' })
export default class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly sseService: SSEService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'SSE 연결 요청' })
  @UseGuards(SseJwtGuard)
  @Sse('sse')
  public connectSSE(@GetUser() user: any): Observable<{ data: string }> {
    const clients = this.sseService.addConnection(user.email);

    return clients;
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'SSE 메시지 전송' })
  @ApiBody({ type: SendSSEMessageDto })
  @UseGuards(JwtAccessGuard)
  @Post('sse/send')
  public sendMessage(@Body() dto: SendSSEMessageDto) {
    this.sseService.sendMessage(dto.userIds, '메시지 내용입니다');

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Send Message',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 알림 리스트 조회' })
  @ApiResponse(NotificationResponse.findNotificationList[200])
  @UseGuards(JwtAccessGuard)
  @Get()
  public async findNotificationList(@GetUser() { email }) {
    const [data, count] =
      await this.notificationService.findNotificationByEmail(email);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Notification Found',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 알림 전체 읽음 처리' })
  @ApiResponse(NotificationResponse.updateNotificationAllStatus[200])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateNotificationAllStatus(@GetUser() { email }) {
    const [data] = await this.notificationService.findNotificationByEmail(
      email,
    );

    await this.notificationService.updateNotificationAllStatus(
      data.map((item) => item.id),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Notification',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 알림 단일 읽음 처리' })
  @ApiResponse(NotificationResponse.updateNotificationStatus[200])
  @ApiResponse(NotificationResponse.updateNotificationStatus[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/:id')
  public async updateNotificationStatus(@Param('id') id: number) {
    await this.notificationService.existedNotification(id);

    await this.notificationService.updateNotificationStatus(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Notification',
    });
  }
}
