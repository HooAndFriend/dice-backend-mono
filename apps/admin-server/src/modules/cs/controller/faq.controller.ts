// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

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
import RequestFaqFindDto from '../dto/faq.find.dto';
import RequestFaqUpdateDto from '../dto/faq.update.dto';
import CsCategoryService from '../service/cs-category.service';

// ** Dto Imports

@ApiTags('Faq')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/faq', version: '1' })
export default class FaqController {
  constructor(
    private readonly faqService: FaqService,
    private readonly csCategoryService: CsCategoryService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Faq 저장' })
  @ApiBody({ type: RequestFaqSaveDto })
  @ApiResponse(FaqResponse.saveFaq[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveFaq(
    @Body() dto: RequestFaqSaveDto,
    @GetAdmin() { email }: Admin,
  ) {
    const category = await this.csCategoryService.findCsCategoryById(
      dto.csCategoryId,
    );

    await this.faqService.saveFaq(dto, email, category);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Faq를 생성했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Faq List 조회' })
  @ApiResponse(FaqResponse.findFaqList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findFaqList(@Query(ValidationPipe) query: RequestFaqFindDto) {
    const [data, count] = await this.faqService.findFaqList(query);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Faq 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Faq 조회' })
  @ApiResponse(FaqResponse.findFaq[200])
  @ApiResponse(FaqResponse.findFaq[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findFaq(@Param('id') id: number) {
    const faq = await this.faqService.findFaq(id);

    return CommonResponse.createResponse({
      data: faq,
      statusCode: 200,
      message: 'Faq를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Faq 삭제' })
  @ApiResponse(FaqResponse.deleteFaq[200])
  @ApiResponse(FaqResponse.deleteFaq[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteFaq(@Param('id') id: number) {
    const faq = await this.faqService.findFaq(id);

    await this.faqService.deleteFaq(faq.id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Faq를 삭제합니다..',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Faq 수정' })
  @ApiBody({ type: RequestFaqUpdateDto })
  @ApiResponse(FaqResponse.updateFaq[200])
  @ApiResponse(FaqResponse.updateFaq[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateFaq(
    @Body() dto: RequestFaqUpdateDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.faqService.existedFaqById(dto.faqId);

    const category = await this.csCategoryService.findCsCategoryById(
      dto.csCategoryId,
    );
    await this.faqService.updateFaq(dto, email, category);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Faq를 수정했습니다.',
    });
  }
}
