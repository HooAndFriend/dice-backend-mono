// ** Nest Imports
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import FaqService from '../service/faq.service';

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
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { FaqResponse } from '@/src/global/response/faq.response';

// ** Dto Imports
import CommonResponse from '@/src/global/dto/api.response';
import Admin from '../../admin/domain/admin.entity';
import RequestFaqSaveDto from '../dto/faq.save.dto';

// ** Dto Imports

@ApiTags('Faq')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/faq', version: '1' })
export default class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: RequestFaqSaveDto })
  @ApiResponse(FaqResponse.saveFaq[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSocialUser(
    @Body() dto: RequestFaqSaveDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.faqService.saveFaq(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Faq를 생성했습니다.',
    });
  }
}
