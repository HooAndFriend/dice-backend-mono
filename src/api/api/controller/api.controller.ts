// ** Nest Imports
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Dto Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Custom Module Imports
import ApiService from '../service/api.service';
import RequestApiSaveDto from '../dto/api.save.dto';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { RequestApiResponse } from '../../../response/api.response';
import { ApiType } from '../../../common/enum/apiType.enum';
import RequestApiUpdateDto from '../dto/api.update.dto';

@ApiTags('Workspace Api')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace/request', version: '1' })
export default class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'api 생성' })
  @ApiBody({ type: RequestApiSaveDto })
  @ApiResponse(RequestApiResponse.saveApi[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveApi(@Body() dto: RequestApiSaveDto) {
    return await this.apiService.saveApi(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'api 수정' })
  @ApiBody({ type: RequestApiUpdateDto })
  @ApiResponse(RequestApiResponse.updateApi[200])
  @ApiResponse(RequestApiResponse.updateApi[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateApi(@Body() dto: RequestApiUpdateDto) {
    return await this.apiService.updateApi(dto);
  }
}
