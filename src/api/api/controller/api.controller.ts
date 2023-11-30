// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

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
import RequestApiUpdateDto from '../dto/api.update.dto';
import RequestApiSaveDto from '../dto/api.save.dto';
import User from '../../user/domain/user.entity';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { RequestApiResponse } from '../../../response/api.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Module Imports
import ApiService from '../service/api.service';

@ApiTags('Workspace Api')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/request', version: '1' })
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'api 조회' })
  @ApiResponse(RequestApiResponse.findApi[200])
  @ApiResponse(RequestApiResponse.findApi[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findApi(@Param('id') id: number) {
    return await this.apiService.findApi(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'api 삭제' })
  @ApiResponse(RequestApiResponse.deleteApi[200])
  @ApiResponse(RequestApiResponse.deleteApi[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteApi(@Param('id') id: number) {
    return await this.apiService.deleteApi(id);
  }
}
