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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Dto Imports
import RequestApiUpdateDto from '../dto/request.update.dto';
import RequestApiSaveDto from '../dto/request.save.dto';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { RequestApiResponse } from '../../../response/api.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Module Imports
import RequestSerivice from '../service/request.service';

@ApiTags('Workspace Request')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/request', version: '1' })
export default class RequestController {
  constructor(private readonly requestService: RequestSerivice) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'request 생성' })
  @ApiBody({ type: RequestApiSaveDto })
  @ApiResponse(RequestApiResponse.saveApi[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveApi(@Body() dto: RequestApiSaveDto) {
    return await this.requestService.saveApi(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'request 수정' })
  @ApiBody({ type: RequestApiUpdateDto })
  @ApiResponse(RequestApiResponse.updateApi[200])
  @ApiResponse(RequestApiResponse.updateApi[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateApi(@Body() dto: RequestApiUpdateDto) {
    return await this.requestService.updateApi(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'request 조회' })
  @ApiResponse(RequestApiResponse.findApi[200])
  @ApiResponse(RequestApiResponse.findApi[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findApi(@Param('id') id: number) {
    return await this.requestService.findApi(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'request 삭제' })
  @ApiResponse(RequestApiResponse.deleteApi[200])
  @ApiResponse(RequestApiResponse.deleteApi[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteApi(@Param('id') id: number) {
    return await this.requestService.deleteApi(id);
  }
}