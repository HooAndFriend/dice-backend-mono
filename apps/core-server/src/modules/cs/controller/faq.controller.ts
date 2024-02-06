// ** Nest Imports
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import FaqService from '../service/faq.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
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
import RequestFaqFindDto from '../dto/faq.find.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { FaqResponse } from '@/src/global/response/faq.response';

// ** Dto Imports

@ApiTags('Faq')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/faq', version: '1' })
export default class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiBearerAuth('access-token')
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
