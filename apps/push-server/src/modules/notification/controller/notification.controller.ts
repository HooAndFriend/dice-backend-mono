// ** Nest Imports
import { Controller, Get, UseGuards } from '@nestjs/common';

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
import CommonResponse from '@/src/global/dto/api.response';
import { NotificationResponse } from '@/src/global/response/notification.response';

// ** Utils Imports
import JwtAccessGuard from '@/src/global/guard/auth.jwt-access.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

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
}
