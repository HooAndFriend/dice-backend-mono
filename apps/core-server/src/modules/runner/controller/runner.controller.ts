// ** Nest Imports
import { Controller, Post } from '@nestjs/common';

// ** Module Imports
import RunnerService from '../service/runner.service';

// ** Swagger Imports
import { ApiTags, ApiResponse } from '@nestjs/swagger';

// ** Response Imports
import { createServerExceptionResponse } from '../../../global/response/common';
import { CommonResponse } from '@hi-dice/common';

@ApiTags('Admin Runner')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/admin/runner', version: '1' })
export default class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post('/')
  public async runner() {
    await this.runnerService.runnerBoard();

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Runner Success',
    });
  }
}
