// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import CsCategoryService from '../service/cs-category.service';

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
import CommonResponse from '@/src/global/dto/api.response';
import { CsCategoryResponse } from '@/src/global/response/cs-category.response';

// ** Dto Imports
import RequestCsCategorySaveDto from '../dto/cs-category.save';
import Admin from '../../admin/domain/admin.entity';

@ApiTags('Cs Category')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/cs-category', version: '1' })
export default class CsCategoryController {
  constructor(private readonly csCategoryService: CsCategoryService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'CS Category 저장' })
  @ApiBody({ type: RequestCsCategorySaveDto })
  @ApiResponse(CsCategoryResponse.saveCsCategory[200])
  @ApiResponse(CsCategoryResponse.saveCsCategory[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveFaq(
    @Body() dto: RequestCsCategorySaveDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.csCategoryService.existedCsCategoryByName(dto.name);
    await this.csCategoryService.saveCsCategory(dto.name, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save CsCategory Success',
    });
  }
}
