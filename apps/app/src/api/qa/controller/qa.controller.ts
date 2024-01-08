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

// ** Module Imports
import QaService from '../service/qa.service';
import CommentService from '../service/comment.service';

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
import { CommentResponse } from '../../../response/comment.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import RequestCommentSaveDto from '../dto/comment.save.dto';
import RequestCommentUpdateDto from '../dto/comment.update.dto';
import RequestQaStatusUpdateDto from '../dto/qa.status.update.dto';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(
    private readonly qaService: QaService,
    private readonly commentService: CommentService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 리스트 조회' })
  @ApiResponse(QaResponse.findQa[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findQa() {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상세로 리스트 조회' })
  @ApiResponse(QaResponse.findQaDetail[200])
  @UseGuards(JwtAccessGuard)
  @Get('/:title/:status')
  public async findQaDetail(
    @Param('title') title: string,
    @Param('status') status: String,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 생성' })
  @ApiBody({ type: RequestQaSaveDto })
  @ApiResponse(QaResponse.saveQa[200])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveQa(@Body() dto: RequestQaSaveDto) {
    return await this.qaService.saveQa(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 수정' })
  @ApiBody({ type: RequestQaUpdateDto })
  @ApiResponse(QaResponse.updateQa[200])
  @ApiResponse(QaResponse.updateQa[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateQa(@Body() dto: RequestQaUpdateDto) {
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 상태 수정' })
  @ApiBody({ type: RequestQaStatusUpdateDto })
  @ApiResponse(QaResponse.updateStatusQa[200])
  @ApiResponse(QaResponse.updateStatusQa[404])
  @UseGuards(JwtAccessGuard)
  @Put('/status')
  public async updateStatusQa(@Body() dto: RequestQaStatusUpdateDto) {
    return await this.qaService.updateQaStatus(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 삭제' })
  @ApiResponse(QaResponse.deleteQa[200])
  @ApiResponse(QaResponse.deleteQa[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteQa(@Param('id') id: number) {
    return await this.qaService.deleteQa(id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 조회' })
  @ApiResponse(CommentResponse.findComment[200])
  @UseGuards(JwtAccessGuard)
  @Get('/comment/:id')
  public async findQaComment(@Param('qaId') qaId: number) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 생성' })
  @ApiBody({ type: RequestCommentSaveDto })
  @ApiResponse(CommentResponse.saveComment[200])
  @UseGuards(JwtAccessGuard)
  @Post('/comment')
  public async saveComment(@Body() dto: RequestCommentSaveDto) {
    return await this.commentService.saveComment(dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 수정' })
  @ApiBody({ type: RequestCommentUpdateDto })
  @ApiResponse(CommentResponse.updateComment[200])
  @ApiResponse(CommentResponse.updateComment[404])
  @UseGuards(JwtAccessGuard)
  @Put('/comment')
  public async updateComment(@Body() dto: RequestCommentUpdateDto) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 삭제' })
  @ApiResponse(CommentResponse.deleteComment[200])
  @ApiResponse(CommentResponse.deleteComment[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/comment/:id')
  public async deleteComment(@Param('id') id: number) {}
}
