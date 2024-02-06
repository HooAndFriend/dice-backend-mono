// ** Nest Imports
import { Body, Controller, Post } from '@nestjs/common';

// ** Module Imports
import QnaService from '../service/qna.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { QnaResponse } from '@/src/global/response/qna.response';

// ** Dto Imports
import RequestQnaSaveDto from '../dto/qna.save.dto';
import CommonResponse from '@/src/global/dto/api.response';

@ApiTags('Qna')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qna', version: '1' })
export default class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qna 생성' })
  @ApiBody({ type: RequestQnaSaveDto })
  @ApiResponse(QnaResponse.saveQna[200])
  @Post('/')
  public async saveQna(@Body() dto: RequestQnaSaveDto) {
    await this.qnaService.saveQna(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qna를 생성했습니다.',
    });
  }
}
