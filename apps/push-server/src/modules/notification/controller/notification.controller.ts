// ** Nest Imports
import {
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

// ** Module Imports
import NotificationService from '../service/notification.service';
import SSEService from '../service/sse.service';

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
import { CommonResponse, SendMailDto } from '@hi-dice/common';
import { NotificationResponse } from '@/src/global/response/notification.response';

// ** Utils Imports
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { Observable } from 'rxjs';
import { SseJwtGuard } from '../../auth/passport/auth.jwt-sse-access.guard';

// ** Dto Imports
import { SendMentionDto } from '../dto/mention-send.dto';

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
    const clients = this.sseService.addConnection(user.userId);

    return clients;
  }

  @EventPattern('notification.send-sse')
  public async sendSSEMessage(@Payload() data: SendMentionDto) {
    this.sseService.sendMessage(data);
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
