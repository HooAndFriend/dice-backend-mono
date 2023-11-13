// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import ErdService from '../service/erd.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { ErdResponse } from '../../../response/erd.response';

// ** Dto Imports
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';
import RequestTableUpdateDto from '../dto/erd.table.update.dto';
import RequestColumnUpdateDto from '../dto/erd.column.update.dto';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

@ApiTags('Workspace Erd')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace/erd', version: '1' })
export default class ErdController {
  constructor(private readonly erdService: ErdService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 생성' })
  @ApiBody({ type: RequestTableSaveDto })
  @ApiResponse(ErdResponse.saveTable[200])
  @ApiResponse(ErdResponse.saveTable[400])
  @UseGuards(JwtAccessGuard)
  @Post('/table')
  public async saveTable(@Body() dto: RequestTableSaveDto) {
    return await this.erdService.saveTable(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 수정' })
  @ApiBody({ type: RequestTableUpdateDto })
  @ApiResponse(ErdResponse.updateTable[200])
  @ApiResponse(ErdResponse.updateTable[400])
  @UseGuards(JwtAccessGuard)
  @Patch('/table/:id')
  public async updateTable(
    @Param('id') id: number,
    @Body() dto: RequestTableUpdateDto,
  ) {
    return await this.erdService.updateTable(id, dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 삭제' })
  @ApiResponse(ErdResponse.deleteTable[200])
  @ApiResponse(ErdResponse.deleteTable[400])
  @UseGuards(JwtAccessGuard)
  @Delete('/table/:id')
  public async deleteTable(@Param('id') id: number) {
    return await this.deleteTable(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 조회' })
  @ApiResponse(ErdResponse.findAllTable[200])
  @ApiResponse(ErdResponse.findAllTable[400])
  @UseGuards(JwtAccessGuard)
  @Get('/table/:id')
  public async findAllTable(@Param('id') id: number) {
    return await this.findAllTable(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 생성' })
  @ApiBody({ type: RequestColumnSaveDto })
  @ApiResponse(ErdResponse.saveColumn[200])
  @ApiResponse(ErdResponse.saveColumn[400])
  @UseGuards(JwtAccessGuard)
  @Post('/column')
  public async saveColumn(@Body() dto: RequestColumnSaveDto) {
    return await this.erdService.saveColumn(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 수정' })
  @ApiBody({ type: RequestColumnUpdateDto })
  @ApiResponse(ErdResponse.updateColumn[200])
  @ApiResponse(ErdResponse.updateColumn[400])
  @UseGuards(JwtAccessGuard)
  @Patch('/column/:id')
  public async updateColumn(
    @Param('id') id: number,
    @Body() dto: RequestColumnUpdateDto,
  ) {
    return await this.erdService.updateColumn(id, dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 삭제' })
  @ApiResponse(ErdResponse.deleteColumn[200])
  @ApiResponse(ErdResponse.deleteColumn[400])
  @UseGuards(JwtAccessGuard)
  @Delete('/column/:id')
  public async deleteColumn(@Param('id') id: number) {
    return await this.deleteColumn(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 조회' })
  @ApiResponse(ErdResponse.findAllColumn[200])
  @ApiResponse(ErdResponse.findAllColumn[400])
  @UseGuards(JwtAccessGuard)
  @Get('/column/:id')
  public async findAllColumn(@Param('id') id: number) {
    return await this.findAllColumn(id);
  }
}
