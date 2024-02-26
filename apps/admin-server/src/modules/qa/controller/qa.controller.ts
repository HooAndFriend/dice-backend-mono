// ** Nest Imports
import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports

// ** Swagger Imports
// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { QaResponse } from '../../../global/response/qa.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiResponse(QaResponse.findQaList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQaList() {}
}
