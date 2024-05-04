// ** Nest Imports
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import QaService from '../service/qa.service';

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
import RequestQaFindDto from '../dto/qa.find.dto';
import { CommonResponse } from '@hi-dice/common';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(private readonly qaService: QaService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiResponse(QaResponse.findQaList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQaListByQuery(@Query(ValidationPipe) dto: RequestQaFindDto) {
    const [data, count] = await this.qaService.findQaListByQuery(dto);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Qa리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA를 조회합니다.' })
  @ApiResponse(QaResponse.findQa[200])
  @ApiResponse(QaResponse.findQa[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findQa(@Param('id', ParseIntPipe) id: number) {
    const qa = await this.qaService.findQaById(id);

    return CommonResponse.createResponse({
      data: qa,
      statusCode: 200,
      message: 'Qa를 조회합니다.',
    });
  }
}
