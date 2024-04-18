// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import NotificationService from '../service/notification.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

// ** Dto Imports

@ApiTags('Notification')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/notification', version: '1' })
export default class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
}
