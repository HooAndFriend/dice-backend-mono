// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

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
import JwtAccessGuard from '../../../auth/passport/auth.jwt-access.guard';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../../global/response/common';
import { CommonResponse } from '@hi-dice/common';
import { CsCategoryResponse } from '@/src/global/response/cs-category.response';

// ** Dto Imports
import RequestCsCategorySaveDto from '../dto/cs-category.save';
import Admin from '../../../admin/domain/admin.entity';
import RequestCsCategoryUpdateDto from '../dto/cs-category.update';
import { BadRequestException } from '@hi-dice/common';

@ApiTags('Cs Category')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/cs-category', version: '1' })
export default class CsCategoryController {
  constructor(private readonly csCategoryService: CsCategoryService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'CS Category 리스트 조회' })
  @ApiResponse(CsCategoryResponse.findCsCategoryList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findCsCategoryList() {
    const [data, count] = await this.csCategoryService.findCsCategoryList();

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Delete CsCategory Success',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'CS Category 저장' })
  @ApiBody({ type: RequestCsCategorySaveDto })
  @ApiResponse(CsCategoryResponse.saveCsCategory[200])
  @ApiResponse(CsCategoryResponse.saveCsCategory[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveCsCategory(
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'CS Category 수정' })
  @ApiBody({ type: RequestCsCategoryUpdateDto })
  @ApiResponse(CsCategoryResponse.updateCsCategory[200])
  @ApiResponse(CsCategoryResponse.updateCsCategory[400.1])
  @ApiResponse(CsCategoryResponse.updateCsCategory[400.2])
  @ApiResponse(CsCategoryResponse.updateCsCategory[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateCsCategory(
    @Body() dto: RequestCsCategoryUpdateDto,
    @GetAdmin() { email }: Admin,
  ) {
    const csCategory = await this.csCategoryService.findCsCategoryById(
      dto.csCategoryId,
    );

    if (csCategory.name === dto.name) {
      throw new BadRequestException('Current name is same with new name');
    }

    await this.csCategoryService.existedCsCategoryByName(dto.name);
    await this.csCategoryService.updateCsCategory(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update CsCategory Success',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'CS Category 삭제' })
  @ApiResponse(CsCategoryResponse.deleteCsCategory[200])
  @ApiResponse(CsCategoryResponse.deleteCsCategory[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteCsCategory(@Param('id', ParseIntPipe) id: number) {
    await this.csCategoryService.existedCsCategoryById(id);
    await this.csCategoryService.deleteCsCategory(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete CsCategory Success',
    });
  }
}
