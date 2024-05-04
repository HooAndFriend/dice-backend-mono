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
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import QaCommentService from '../service/qa.comment.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Response Imports
import { CommentResponse } from '../../../global/response/comment.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports
import RequestQaCommentSaveDto from '../dto/comment.save.dto';
import RequestQaCommentUpdateDto from '../dto/comment.update.dto';

// ** Entity Imports
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';

// ** Emum Imports
import {
  RoleEnum,
  CommonResponse,
  RequestQaHistoryLogSaveDto,
} from '@hi-dice/common';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa/comment', version: '1' })
export default class QaCommentController {
  constructor(
    private readonly qaCommentService: QaCommentService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(CommentResponse.findComment[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:qaId')
  public async findQaComment(
    @Param('qaId') qaId: number,
    @GetWorkspace() workspace: Workspace,
  ) {
    const { data, count } = await this.qaCommentService.findQaComment(
      qaId,
      workspace,
    );
    return CommonResponse.createResponse({
      statusCode: 200,
      message: '댓글을 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 생성' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaCommentSaveDto })
  @ApiResponse(CommentResponse.saveComment[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveComment(
    @Body() dto: RequestQaCommentSaveDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() user: User,
  ) {
    await this.qaCommentService.saveComment(dto, workspace, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaCommentUpdateDto })
  @ApiResponse(CommentResponse.updateComment[200])
  @ApiResponse(CommentResponse.updateComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateComment(
    @Body() dto: RequestQaCommentUpdateDto,
    @GetUser() user: User,
  ) {
    await this.qaCommentService.updateComment(dto, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 댓글 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(CommentResponse.deleteComment[200])
  @ApiResponse(CommentResponse.deleteComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteComment(@Param('id') id: number, @GetUser() user: User) {
    await this.qaCommentService.deleteComment(id, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '댓글을 삭제합니다.',
    });
  }

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendQaQueue(event: RequestQaHistoryLogSaveDto) {
    this.eventEmitter.emit('qa.send-change-history', event);
  }
}
