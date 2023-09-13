// ** Nest Imports
import { Controller, Post, Body } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// ** enum, dto, entity, types Imports
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import { AuthResponse } from 'src/response/auth.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '소셜 유저 생성' })
  @ApiBody({ type: RequestSocialUserSaveDto })
  @ApiResponse(AuthResponse.saveSocialUser[200])
  @ApiResponse(AuthResponse.saveSocialUser[400])
  @Post('/social/user')
  public async saveSocialUser(@Body() dto: RequestSocialUserSaveDto) {
    return await this.authService.saveSocialUser(dto);
  }

  @ApiOperation({ summary: '소셜 유저 로그인' })
  @ApiBody({ type: RequestSocialUserLoginDto })
  @ApiResponse(AuthResponse.loginSocialUser[200])
  @ApiResponse(AuthResponse.loginSocialUser[404])
  @Post('/social')
  public async loginSocialUser(@Body() dto: RequestSocialUserLoginDto) {
    return await this.authService.loginSocialUser(dto);
  }

  @ApiOperation({ summary: '다이스 유저 로그인' })
  @ApiBody({ type: RequestDiceUserLoginDto })
  @ApiResponse(AuthResponse.loginDiceUser[200])
  @ApiResponse(AuthResponse.loginDiceUser[400])
  @ApiResponse(AuthResponse.loginDiceUser[404])
  @Post('/')
  public async loginDiceUser(@Body() dto: RequestDiceUserLoginDto) {
    return await this.authService.loginDiceUser(dto);
  }

  @ApiOperation({ summary: '다이스 유저 생성' })
  @ApiBody({ type: RequestDiceUserSaveDto })
  @ApiResponse(AuthResponse.saveDiceUser[200])
  @ApiResponse(AuthResponse.saveDiceUser[400])
  @Post('/user')
  public async saveDiceUser(@Body() dto: RequestDiceUserSaveDto) {
    return await this.authService.saveDiceUser(dto);
  }
}
