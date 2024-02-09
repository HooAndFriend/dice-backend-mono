// ** Nest Imports
import { Controller, Post, Body, UseGuards, Get, Ip } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// ** enum, dto, entity, types Imports
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import { AuthResponse } from '../../../global/response/auth.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import RequestUserReissueDto from '../dto/user.reissue.dto';
import JwtRefreshGuard from '../passport/auth.jwt-refresh.guard';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { GetUser } from '../../../global/decorators/user/user.decorators';
import User from '../../user/domain/user.entity';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import RequestLogDto from '@/src/global/dto/request-log.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { response } from 'express';

@ApiTags('Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '소셜 유저 생성' })
  @ApiBody({ type: RequestSocialUserSaveDto })
  @ApiResponse(AuthResponse.saveSocialUser[200])
  @ApiResponse(AuthResponse.saveSocialUser[400])
  @Post('/social/user')
  public async saveSocialUser(@Body() dto: RequestSocialUserSaveDto) {
    const response = await this.authService.saveSocialUser(dto);
    const responseData = {
      token: response.token,
      user: {
        nickname: response.saveUser.nickname,
        profile: response.saveUser.profile,
        email: response.saveUser.email,
      },
      workspace: {
        id: response.workspace.id,
        name: response.workspace.name,
        profile: response.workspace.profile,
        uuid: response.workspace.uuid,
        workspaceFunction: [],
      },
    };
    return CommonResponse.createResponse({
      data: responseData,
      statusCode: 200,
      message: '회원가입 했습니다.',
    });
  }

  @ApiOperation({ summary: '소셜 유저 로그인' })
  @ApiBody({ type: RequestSocialUserLoginDto })
  @ApiResponse(AuthResponse.loginSocialUser[200])
  @ApiResponse(AuthResponse.loginSocialUser[404])
  @Post('/social')
  public async loginSocialUser(@Body() dto: RequestSocialUserLoginDto) {
    try {
      const response = await this.authService.loginSocialUser(dto);
      const responseData = {
        token: response.token,
        user: {
          nickname: response.User.nickname,
          profile: response.User.profile,
          email: response.User.email,
        },
      };
      return CommonResponse.createResponse({
        data: responseData,
        statusCode: 200,
        message: 'Login Successed',
      });
    } catch (error) {
      return CommonResponse.createResponse({
        statusCode: 500,
        message: 'Internal Server Error',
        data: null,
      });
    }
  }

  @ApiOperation({ summary: '다이스 유저 로그인' })
  @ApiBody({ type: RequestDiceUserLoginDto })
  @ApiResponse(AuthResponse.loginDiceUser[200])
  @ApiResponse(AuthResponse.loginDiceUser[400])
  @ApiResponse(AuthResponse.loginDiceUser[404])
  @Post('/')
  public async loginDiceUser(@Ip() ip, @Body() dto: RequestDiceUserLoginDto) {
    try {
      const response = await this.authService.loginDiceUser(dto);
      const responseData = {
        token: response.token,
        user: {
          nickname: response.User.nickname,
          profile: response.User.profile,
          email: response.User.email,
        },
      };
      return CommonResponse.createResponse({
        data: responseData,
        statusCode: 200,
        message: 'Login Successed',
      });
    } catch (error) {
      return CommonResponse.createResponse({
        statusCode: 500,
        message: 'Internal Server Error',
        data: null,
      });
    }
  }

  @ApiOperation({ summary: '다이스 유저 생성' })
  @ApiBody({ type: RequestDiceUserSaveDto })
  @ApiResponse(AuthResponse.saveDiceUser[200])
  @ApiResponse(AuthResponse.saveDiceUser[400])
  @Post('/user')
  public async saveDiceUser(@Body() dto: RequestDiceUserSaveDto) {
    const response = await this.authService.saveDiceUser(dto);
    const responseData = {
      token: response.token,
      user: {
        nickname: response.saveUser.nickname,
        profile: response.saveUser.profile,
        email: response.saveUser.email,
      },
      workspace: {
        id: response.workspace.id,
        name: response.workspace.name,
        profile: response.workspace.profile,
        uuid: response.workspace.uuid,
        workspaceFunction: [],
      },
    };
    return CommonResponse.createResponse({
      data: responseData,
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

  @MessagePattern('request-log')
  async handleMessage(
    @Payload() data: RequestLogDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(data);
    // await this.requestLogService.saveRequestLog(data);
  }
}
