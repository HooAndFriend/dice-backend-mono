// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import RequestLogService from '../service/request-log.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Workspace Function')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/request-log', version: '1' })
export default class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  @MessagePattern({ cmd: 'send-message' })
  async handleMessage(data: string): Promise<string> {
    console.log(`Received message: ${data}`);
    return 'Message sent successfully!';
  }
}
