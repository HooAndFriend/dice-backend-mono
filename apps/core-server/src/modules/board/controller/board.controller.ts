// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import BoardService from '../service/board.service';

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
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import CommonResponse from '@/src/global/dto/api.response';
import { BoardResponse } from '@/src/global/response/board.response';

// ** Dto Imports
import User from '../../user/domain/user.entity';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestBoardSaveDto from '../dto/board.save.dto';

@ApiTags('Board')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/board', version: '1' })
export default class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 생성' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestBoardSaveDto })
  @ApiResponse(BoardResponse.saveBoard[200])
  @ApiResponse(BoardResponse.saveBoard[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveBoard(
    @Body() dto: RequestBoardSaveDto,
    @GetWorkspace() workspace: Workspace,
    @GetUser() user: User,
  ) {
    if (dto.parentId) {
      const parentBoard = await this.boardService.findBoardById(dto.parentId);
      await this.boardService.saveBoardWithParent(
        dto.title,
        user.email,
        workspace,
        parentBoard,
      );
    } else {
      await this.boardService.saveBoard(dto.title, user.email, workspace);
    }

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Board를 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(BoardResponse.deleteBoard[200])
  @ApiResponse(BoardResponse.deleteBoard[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:boardId')
  public async deleteBoard(@Param('boardId') boardId: number) {
    await this.boardService.existedBoardById(boardId);
    await this.boardService.deleteBoard(boardId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Board를 삭제합니다.',
    });
  }
}
