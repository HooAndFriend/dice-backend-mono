// ** Nest Imports
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import QaService from '../service/qa.service';

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

// ** Response Imports
import { QaResponse } from '../../../response/qa.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import { GetUser } from '../../../common/decorators/user.decorators';
import Qa from '../domain/qa.entity';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(private readonly qaService: QaService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiResponse(QaResponse.findQa[200])
  @ApiResponse(QaResponse.findQa[404])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQa(@GetUser() user: Qa) {
    return await this.qaService.findQa(user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상세로 리스트 조회' })
  @ApiResponse(QaResponse.findQaDetail[200])
  @ApiResponse(QaResponse.findQaDetail[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:title/:status')
  public async findQaDetail(@Param('title') title : string, @Param('status') status : String, @GetUser() qa: Qa) {
    return await this.qaService.findQa(qa);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 생성' })
  @ApiBody({ type: RequestQaSaveDto })
  @ApiResponse(QaResponse.saveQa[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveQa(@GetUser() qa: Qa) {
    // return await this.qaService.findQa(qa);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 수정' })
  @ApiBody({ type: RequestQaUpdateDto })
  @ApiResponse(QaResponse.updateQa[200])
  @ApiResponse(QaResponse.updateQa[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateQa(
    @Body() dto: RequestQaUpdateDto,
    @GetUser() qa: Qa,
  ) {
    // return await this.qaService.updateQa(dto, qa);
  }
  
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상태 수정' })
  @ApiBody({ type: RequestQaUpdateDto })
  @ApiResponse(QaResponse.updateStatusQa[200])
  @ApiResponse(QaResponse.updateStatusQa[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateStatusQa(
    @Body() dto: RequestQaUpdateDto,
    @GetUser() qa: Qa,
  ) {
    // return await this.qaService.updateQa(dto, qa);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 삭제' })
  @ApiResponse(QaResponse.deleteQa[200])
  @ApiResponse(QaResponse.deleteQa[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteQa(
    @Param('id') id : number,
    @GetUser() qa: Qa,
  ) {
    // return await this.qaService.deleteQa(dto, qa);
  }

}
