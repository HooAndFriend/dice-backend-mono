// ** Nest Imports
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { UserResponse } from '@/src/global/response/user.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Dto Imports
import RequestUserFindDto from '../dto/user.find.dto';
import { CommonResponse } from '@repo/common';
import TeamUserService from '../../team/service/team-user.service';
import WorkspaceUserService from '../../workspace/service/workspace-user.service';
import RequestDeleteUserFindDto from '../dto/user-delete.find.dto';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly teamUserService: TeamUserService,
    private readonly workspaceUserService: WorkspaceUserService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 리스트 조회' })
  @ApiResponse(UserResponse.findUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUserList(@Query(ValidationPipe) dto: RequestUserFindDto) {
    const [data, count] = await this.userService.findUserList(dto);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '유저 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '탈퇴한 유저 리스트 조회' })
  @ApiResponse(UserResponse.findUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/delete')
  public async findDeleteUserList(
    @Query(ValidationPipe) dto: RequestDeleteUserFindDto,
  ) {
    const [data, count] = await this.userService.findDeleteUserList(dto);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '삭제된 유저 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 조회' })
  @ApiResponse(UserResponse.findUser[200])
  @ApiResponse(UserResponse.findUser[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findUser(@Param('id') id: number) {
    const data = await this.userService.findUserById(id);

    return CommonResponse.createResponse({
      data,
      statusCode: 200,
      message: '유저를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 팀 리스트 조회' })
  @ApiResponse(UserResponse.findTeamUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/team/:id')
  public async findTeamUserList(@Param('id') id: number) {
    const [data, count] = await this.teamUserService.findTeamUserList(id);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '유저의 팀 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 워크스페이스 리스트 조회' })
  @ApiResponse(UserResponse.findWorksapceUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/workspace/:id')
  public async findWorkspaceUserList(@Param('id') id: number) {
    const [data, count] = await this.workspaceUserService.findWorkspaceUserList(
      id,
    );

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: '유저의 워크스페이스 리스트를 조회합니다.',
    });
  }
}
