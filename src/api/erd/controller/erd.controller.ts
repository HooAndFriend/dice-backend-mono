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
import RequestTableSaveDto from '../dto/table/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/column/erd.column.save.dto';
import RequestTableUpdateDto from '../dto/table/erd.table.update.dto';
import RequestColumnUpdateDto from '../dto/column/erd.column.update.dto';
import RequestMappingSaveDto from '../dto/mapping/erd.mapping.save.dto';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../common/decorators/user.decorators';
import User from '../../user/domain/user.entity';

@ApiTags('Workspace Erd')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/erd', version: '1' })
export default class ErdController {
  constructor(private readonly erdService: ErdService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 생성' })
  @ApiBody({ type: RequestTableSaveDto })
  @ApiResponse(ErdResponse.saveTable[200])
  @UseGuards(JwtAccessGuard)
  @Post('/table')
  public async saveTable(
    @Body() dto: RequestTableSaveDto,
    @GetUser() user: User,
  ) {
    return await this.erdService.saveTable(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 수정' })
  @ApiBody({ type: RequestTableUpdateDto })
  @ApiResponse(ErdResponse.updateTable[200])
  @ApiResponse(ErdResponse.updateTable[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/table')
  public async updateTable(
    @Body() dto: RequestTableUpdateDto,
    @GetUser() user: User,
  ) {
    return await this.erdService.updateTable(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 삭제' })
  @ApiResponse(ErdResponse.deleteTable[200])
  @ApiResponse(ErdResponse.deleteTable[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/table/:tableId')
  public async deleteTable(@Param('tableId') id: number) {
    return await this.erdService.deleteTable(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '테이블 매핑' })
  @ApiResponse(ErdResponse.tableMapping[200])
  @ApiResponse(ErdResponse.tableMapping[404])
  @UseGuards(JwtAccessGuard)
  @Post('/table/mapping')
  public async tableMapping(
    @Body() dto: RequestMappingSaveDto,
    @GetUser() user: User,
  ) {
    return this.erdService.tableMapping(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 생성' })
  @ApiBody({ type: RequestColumnSaveDto })
  @ApiResponse(ErdResponse.saveColumn[200])
  @UseGuards(JwtAccessGuard)
  @Post('/column')
  public async saveColumn(
    @Body() dto: RequestColumnSaveDto,
    @GetUser() user: User,
  ) {
    return await this.erdService.saveColumn(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 수정' })
  @ApiBody({ type: RequestColumnUpdateDto })
  @ApiResponse(ErdResponse.updateColumn[200])
  @ApiResponse(ErdResponse.updateColumn[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/column')
  public async updateColumn(
    @Body() dto: RequestColumnUpdateDto,
    @GetUser() user: User,
  ) {
    return await this.erdService.updateColumn(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '컬럼 삭제' })
  @ApiResponse(ErdResponse.deleteColumn[200])
  @ApiResponse(ErdResponse.deleteColumn[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/column/:columnId')
  public async deleteColumn(@Param('columnId') id: number) {
    return await this.erdService.deleteColumn(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Erd 조회' })
  @ApiResponse(ErdResponse.findErd[200])
  @ApiResponse(ErdResponse.findErd[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:diagramId')
  public async findErd(@Param('diagramId') id: number) {
    return await this.erdService.findErd(id);
  }
}
