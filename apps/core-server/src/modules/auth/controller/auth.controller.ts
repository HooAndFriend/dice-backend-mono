// ** Nest Imports
import { Controller, Post, Body, UseGuards, Get, Ip } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';
import UserService from '../../user/service/user.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import WorkspaceService from '../../workspace/service/workspace.service';

// ** Utils Imports
import JwtRefreshGuard from '../passport/auth.jwt-refresh.guard';
import { GetUser } from '../../../global/decorators/user/user.decorators';

// ** enum, dto, entity, types Imports
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import { AuthResponse } from '../../../global/response/auth.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import RequestUserReissueDto from '../dto/user.reissue.dto';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import User from '../../user/domain/user.entity';
import { CommonResponse } from '@hi-dice/common';

@ApiTags('Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @ApiOperation({ summary: '다이스 유저 로그인' })
  @ApiBody({ type: RequestDiceUserLoginDto })
  @ApiResponse(AuthResponse.loginDiceUser[200])
  @ApiResponse(AuthResponse.loginDiceUser[400])
  @ApiResponse(AuthResponse.loginDiceUser[404])
  @Post('/')
  public async loginDiceUser(@Body() dto: RequestDiceUserLoginDto) {
    const user = await this.userService.findUserWithWorkspaceByEmail(dto);
    await this.userService.validationPassword(user, dto.password);
    const token = this.authService.generateToken(user);
    const workspace = await this.workspaceService.findPersonalWorkspaceList(
      user.email,
    );

    return CommonResponse.createResponse({
      data: {
        token: token,
        user: {
          nickname: user.nickname,
          profile: user.profile,
          email: user.email,
          fcmToken: user.fcmToken,
        },
        workspace,
      },
      statusCode: 200,
      message: 'Login Successed',
    });
  }

  @ApiOperation({ summary: '소셜 유저 로그인' })
  @ApiBody({ type: RequestSocialUserLoginDto })
  @ApiResponse(AuthResponse.loginSocialUser[200])
  @ApiResponse(AuthResponse.loginSocialUser[404])
  @Post('/social')
  public async loginSocialUser(@Body() dto: RequestSocialUserLoginDto) {
    const user = await this.userService.findUserWithWorkspaceByToken(dto);
    const token = this.authService.generateToken(user);
    const workspace = await this.workspaceService.findPersonalWorkspaceList(
      user.email,
    );

    return CommonResponse.createResponse({
      data: {
        token: token,
        user: {
          nickname: user.nickname,
          profile: user.profile,
          email: user.email,
          fcmToken: user.fcmToken,
        },
        workspace,
      },
      statusCode: 200,
      message: 'Login Successed',
    });
  }

  @ApiOperation({ summary: '다이스 유저 생성' })
  @ApiBody({ type: RequestDiceUserSaveDto })
  @ApiResponse(AuthResponse.saveDiceUser[200])
  @ApiResponse(AuthResponse.saveDiceUser[400])
  @Post('/user')
  public async saveDiceUser(@Body() dto: RequestDiceUserSaveDto) {
    await this.userService.existedUserByEmail(dto.email);
    const { user, workspace, workspaceFunction } =
      await this.userService.saveDiceUser(dto);

    const token = this.authService.generateToken(user);

    return CommonResponse.createResponse({
      data: {
        token: token,
        user: {
          nickname: user.nickname,
          profile: user.profile,
          email: user.email,
          fcmToken: user.fcmToken,
        },
        workspace: {
          workspaceId: workspace.workspaceId,
          name: workspace.name,
          comment: workspace.comment,
          profile: workspace.profile,
          uuid: workspace.uuid,
          workspaceFunction,
        },
      },
      statusCode: 200,
      message: '회원가입 했습니다.',
    });
  }

  @ApiOperation({ summary: '소셜 유저 생성' })
  @ApiBody({ type: RequestSocialUserSaveDto })
  @ApiResponse(AuthResponse.saveSocialUser[200])
  @ApiResponse(AuthResponse.saveSocialUser[400])
  @Post('/social/user')
  public async saveSocialUser(@Body() dto: RequestSocialUserSaveDto) {
    await this.userService.existedUserByTokenAndType(dto.token, dto.type);
    await this.userService.existedUserByEmail(dto.email);
    const { user, workspace, workspaceFunction } =
      await this.userService.saveSocialUser(dto);

    const token = this.authService.generateToken(user);

    return CommonResponse.createResponse({
      data: {
        token: token,
        user: {
          nickname: user.nickname,
          profile: user.profile,
          email: user.email,
          fcmToken: user.fcmToken,
        },
        workspace: {
          workspaceId: workspace.workspaceId,
          name: workspace.name,
          comment: workspace.comment,
          profile: workspace.profile,
          uuid: workspace.uuid,
          workspaceFunction,
        },
      },
      statusCode: 200,
      message: '회원가입 했습니다.',
    });
  }

  @ApiOperation({ summary: '유저 토큰 재발급' })
  @ApiBody({ type: RequestUserReissueDto })
  @UseGuards(JwtRefreshGuard)
  @ApiResponse(AuthResponse.reissueToken[200])
  @ApiResponse(createUnauthorizedResponse())
  @Post('/reissue')
  public async reissueToken(@GetUser() user: User) {
    const accessToken = await this.authService.reissueToken(user);
    return CommonResponse.createResponse({
      statusCode: 200,
      message: '토큰을 재발급합니다.',
      data: { accessToken },
    });
  }
}
