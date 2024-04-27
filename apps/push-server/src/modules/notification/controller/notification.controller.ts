// ** Nest Imports
import { Controller, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import NotificationService from '../service/notification.service';

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
import { CommonResponse } from '@repo/common';
import { NotificationResponse } from '@/src/global/response/notification.response';

// ** Utils Imports
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Dto Imports

@ApiTags('Notification')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/notification', version: '1' })
export default class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

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
