// ** Nest Imports
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import QaCommentService from '../service/qa-comment.service';

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
import { QaCommentResponse } from '../../../response/qa-comment.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import RequestQaCommentSaveDto from '../dto/qa-comment.save.dto';
import RequestQaCommentUpdateDto from '../dto/qa-comment.update.dto';
import { GetUser } from '../../../common/decorators/user.decorators';
import Qa from '../domain/qa-comment.entity';

@ApiTags('QA Comment')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa-commnet', version: '1' })
export default class QaController {
  constructor(private readonly qaService: QaCommentService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 조회' })
  @ApiResponse(QaCommentResponse.findQaComment[200])
  @ApiResponse(QaCommentResponse.findQaComment[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findQaComment(@Param('qaId') qaId : number,  @GetUser() user: Qa) {
    // return await this.qaService.findQa(user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 생성' })
  @ApiBody({ type: RequestQaCommentSaveDto })
  @ApiResponse(QaCommentResponse.saveQaComment[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveQa(@GetUser() qa: Qa) {
    // return await this.qaService.findQa(qa);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 수정' })
  @ApiBody({ type: RequestQaCommentUpdateDto })
  @ApiResponse(QaCommentResponse.updateQaComment[200])
  @ApiResponse(QaCommentResponse.updateQaComment[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateQa(
    @Body() dto: RequestQaCommentUpdateDto,
    @GetUser() qa: Qa,
  ) {
    // return await this.qaService.updateQa(dto, qa);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 삭제' })
  @ApiResponse(QaCommentResponse.deleteQaComment[200])
  @ApiResponse(QaCommentResponse.deleteQaComment[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteQa(
    @Param('id') id : number,
    @GetUser() qa: Qa,
  ) {
    // return await this.qaService.deleteQa(dto, qa);
  }

}
