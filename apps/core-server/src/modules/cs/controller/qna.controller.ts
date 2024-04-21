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
import CsCategoryService from '../service/cs-category.service';

@ApiTags('Qna')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qna', version: '1' })
export default class QnaController {
  constructor(
    private readonly qnaService: QnaService,
    private readonly csCategoryService: CsCategoryService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qna 생성' })
  @ApiBody({ type: RequestQnaSaveDto })
  @ApiResponse(QnaResponse.saveQna[200])
  @Post('/')
  public async saveQna(@Body() dto: RequestQnaSaveDto) {
    const qna = await this.csCategoryService.findCsCategoryById(dto.categoryId);

    await this.qnaService.saveQna(dto, qna);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qna를 생성했습니다.',
    });
  }
}
