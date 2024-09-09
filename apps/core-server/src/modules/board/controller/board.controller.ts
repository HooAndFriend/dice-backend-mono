// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import BoardService from '../service/board.service';
import UserService from '../../user/service/user.service';

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
import { CommonResponse } from '@hi-dice/common';
import { BoardResponse } from '@/src/global/response/board.response';

// ** Dto Imports
import User from '../../user/domain/user.entity';
import { RoleEnum } from '@hi-dice/common';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestBoardSaveDto from '../dto/board.save.dto';
import RequestBoardTitleUpdateDto from '../dto/board-name.update.dto';
import RequestBoardUpdateDto from '../dto/board.update.dto';

@ApiTags('Board')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/board', version: '1' })
export default class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) {}

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
    let response = 0;
    if (dto.parentId) {
      const parentBoard = await this.boardService.findBoardById(dto.parentId);
      const { boardId } = await this.boardService.saveBoardWithParent(
        dto.title,
        user.email,
        workspace,
        parentBoard,
      );
      response = boardId;
    } else {
      const { boardId } = await this.boardService.saveBoard(
        dto.title,
        user.email,
        workspace,
      );
      response = boardId;
    }

    return CommonResponse.createResponse({
      data: response,
      statusCode: 200,
      message: 'Board를 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestBoardUpdateDto })
  @ApiResponse(BoardResponse.updateBoard[200])
  @ApiResponse(BoardResponse.updateBoard[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateBoard(
    @Body() dto: RequestBoardUpdateDto,
    @GetUser() user: User,
  ) {
    await this.boardService.existedBoardById(dto.boardId);
    await this.boardService.updateBoard(dto, user.email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Board를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board Title 수정' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestBoardTitleUpdateDto })
  @ApiResponse(BoardResponse.updateBoardTitle[200])
  @ApiResponse(BoardResponse.updateBoardTitle[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateBoardTitle(
    @Body() dto: RequestBoardTitleUpdateDto,
    @GetUser() user: User,
  ) {
    await this.boardService.existedBoardById(dto.boardId);
    await this.boardService.updateBoardTitle(
      dto.boardId,
      dto.title,
      user.email,
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Board를 수정합니다.',
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 리스트 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(BoardResponse.findBoardList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findBoardList(@GetWorkspace() { workspaceId }: Workspace) {
    const [data, count] = await this.boardService.findBoardListByWorkspaceId(
      workspaceId,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Board 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 리스트 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(BoardResponse.findBoardList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/simple')
  public async findBoardSimpleList(@GetWorkspace() { workspaceId }: Workspace) {
    const [data, count] = await this.boardService.findBoardSimpleList(
      workspaceId,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Board 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Board 조회' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(BoardResponse.findBoard[200])
  @ApiResponse(BoardResponse.findBoard[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:boardId')
  public async findBoard(@Param('boardId', ParseIntPipe) boardId: number) {
    const board = await this.boardService.findBoardById(boardId);

    const user = await this.userService.findUserByEmail(board.createdId);

    return CommonResponse.createResponse({
      data: {
        ...board,
        createdUser: {
          id: user.userId,
          profile: user.profile,
          nickname: user.nickname,
        },
      },
      statusCode: 200,
      message: 'Board를 조회합니다.',
    });
  }
}
