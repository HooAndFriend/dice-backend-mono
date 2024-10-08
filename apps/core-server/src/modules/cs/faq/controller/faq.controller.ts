// ** Nest Imports
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

// ** Module Imports
import FaqService from '../service/faq.service';

// ** Swagger Imports
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../../global/response/common';
import { CommonResponse } from '@hi-dice/common';
import { FaqResponse } from '@/src/global/response/faq.response';

// ** Dto Imports
import RequestFaqFindDto from '../dto/faq.find.dto';

@ApiTags('Faq')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/faq', version: '1' })
export default class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiOperation({ summary: 'Faq List 조회' })
  @ApiResponse(FaqResponse.findFaqList[200])
  @Get('/')
  public async findFaqList(@Query(ValidationPipe) query: RequestFaqFindDto) {
    const [data, count] = await this.faqService.findFaqList(query);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Faq 리스트를 조회합니다.',
    });
  }
}
