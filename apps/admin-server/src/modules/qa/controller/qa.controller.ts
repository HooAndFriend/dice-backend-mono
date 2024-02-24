// ** Nest Imports
import {
  Controller,
  Get,
  Query,
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
import RequestQaFindDto from '../dto/qa.find.dto';
import QaService from '../service/qa.service';
import CommentService from '../service/comment.service';
import CommonResponse from '@/src/global/dto/api.response';

// ** Dto Imports

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(
    private readonly qaService: QaService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiResponse(QaResponse.findQaList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQaList(
  ) {
    const qaList = await this.qaService.findQaList()

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Qa리스트를 조회합니다.',
      data: qaList,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상세 조회' })
  @ApiResponse(QaResponse.findQaList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/detail/')
  public async findQaListByQuery(
    @Query() findquery: RequestQaFindDto,
  ) {
    const qaList = await this.qaService.findQaListByQuery(findquery)

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Qa리스트를 상세 조회합니다.',
      data: qaList,
    });
  }
}
