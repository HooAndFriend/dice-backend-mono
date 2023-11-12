// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// ** Module Imports
import ErdService from '../service/erd.service';

// ** Swagger Imports
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import { AuthResponse } from '../../../response/auth.response';
import { ErdResponse } from '../../../response/erd.response';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';

@ApiTags('Workspace Erd')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/workspace/erd', version: '1' })
export default class ErdController {
  constructor(private readonly erdService: ErdService) {}

  @ApiOperation({ summary: '테이블 생성' })
  @ApiBody({ type: RequestTableSaveDto })
  @ApiResponse(ErdResponse.saveTable[200])
  @ApiResponse(ErdResponse.saveTable[400])
  @Post('/table')
  public async saveTable(@Body() dto: RequestTableSaveDto) {
    return await this.erdService.saveTable(dto);
  }

  @ApiOperation({ summary: '테이블 수정' })
  @ApiBody({ type: RequestTableSaveDto })
  @ApiResponse(ErdResponse.updateTable[200])
  @ApiResponse(ErdResponse.updateTable[400])
  @Patch('/table/:id')
  public async updateTable(
    @Param('id') id: number,
    @Body() dto: RequestTableSaveDto,
  ) {
    return await this.erdService.updateTable(id, dto);
  }

  @ApiOperation({ summary: '테이블 삭제' })
  @ApiResponse(ErdResponse.deleteTable[200])
  @ApiResponse(ErdResponse.deleteTable[400])
  @Delete('/table/:id')
  public async deleteTable(@Param('id') id: number) {
    return await this.deleteTable(id);
  }

  @ApiOperation({ summary: '테이블 조회' })
  @ApiResponse(ErdResponse.findAllTable[200])
  @ApiResponse(ErdResponse.findAllTable[400])
  @Get('/table/:id')
  public async findAllTable(@Param('id') id: number) {
    return await this.findAllTable(id);
  }

  @ApiOperation({ summary: '컬럼 생성' })
  @ApiBody({ type: RequestColumnSaveDto })
  @ApiResponse(ErdResponse.saveColumn[200])
  @ApiResponse(ErdResponse.saveColumn[400])
  @Post('/column')
  public async saveColumn(@Body() dto: RequestColumnSaveDto) {
    return await this.erdService.saveColumn(dto);
  }

  @ApiOperation({ summary: '컬럼 수정' })
  @ApiBody({ type: RequestColumnSaveDto })
  @ApiResponse(ErdResponse.updateColumn[200])
  @ApiResponse(ErdResponse.updateColumn[400])
  @Patch('/column/:id')
  public async updateColumn(
    @Param('id') id: number,
    @Body() dto: RequestColumnSaveDto,
  ) {
    return await this.erdService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: '컬럼 삭제' })
  @ApiResponse(ErdResponse.deleteColumn[200])
  @ApiResponse(ErdResponse.deleteColumn[400])
  @Delete('/column/:id')
  public async deleteColumn(@Param('id') id: number) {
    return await this.deleteColumn(id);
  }

  @ApiOperation({ summary: '컬럼 조회' })
  @ApiResponse(ErdResponse.findAllColumn[200])
  @ApiResponse(ErdResponse.findAllColumn[400])
  @Get('/column/:id')
  public async findAllColumn(@Param('id') id: number) {
    return await this.findAllColumn(id);
  }
}
