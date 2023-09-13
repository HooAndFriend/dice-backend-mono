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

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: RequestSocialUserSaveDto })
  @ApiResponse(AuthResponse.saveUser[200])
  @ApiResponse(AuthResponse.saveUser[400])
  @Post('/user')
  public async saveSocialUser(@Body() dto: RequestSocialUserSaveDto) {
    return await this.authService.saveSocialUser(dto);
  }

  @ApiOperation({ summary: '유저 로그인' })
  @ApiBody({ type: RequestSocialUserLoginDto })
  @ApiResponse(AuthResponse.loginUser[200])
  @ApiResponse(AuthResponse.loginUser[404])
  @Post('/')
  public async loginSocialUser(@Body() dto: RequestSocialUserLoginDto) {
    return await this.authService.loginSocialUser(dto);
  }
}
