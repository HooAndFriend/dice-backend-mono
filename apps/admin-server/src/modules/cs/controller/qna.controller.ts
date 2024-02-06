// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

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
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { QnaResponse } from '@/src/global/response/qna.response';

// ** Dto Imports
import CommonResponse from '@/src/global/dto/api.response';
import RequestQnaFindDto from '../dto/qna.find.dto';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';
import Admin from '../../admin/domain/admin.entity';
import RequestQnaAnswerDto from '../dto/qna.answer.dto';

@ApiTags('Qna')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qna', version: '1' })
export default class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qna List 조회' })
  @ApiResponse(QnaResponse.findQnaList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQnaList(@Query(ValidationPipe) query: RequestQnaFindDto) {
    const [data, count] = await this.qnaService.findQnaList(query);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Qna 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qna 조회' })
  @ApiResponse(QnaResponse.findQna[200])
  @ApiResponse(QnaResponse.findQna[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findQna(@Param('id') id: number) {
    const qna = await this.qnaService.findQna(id);

    return CommonResponse.createResponse({
      data: qna,
      statusCode: 200,
      message: 'Qna를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Qna 답변' })
  @ApiBody({ type: RequestQnaAnswerDto })
  @ApiResponse(QnaResponse.answerQna[200])
  @ApiResponse(QnaResponse.answerQna[404])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveFaq(
    @Body() dto: RequestQnaAnswerDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.qnaService.findQna(dto.qnaId);
    await this.qnaService.answerQna(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Qna에 답변했습니다.',
    });
  }
}
