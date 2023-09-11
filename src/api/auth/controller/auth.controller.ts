// ** Nest Imports
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

// ** enum, dto, entity Imports
import ApiResponse from 'src/common/dto/api.response';
import RequestPassportJwtDto from '../dto/user.passport.jwt.user.dto';
import RequestPassportDto from '../dto/user.passport.user.dto';
import { UserRole } from '../dto/user.role';
import RequestUserSaveDto from '../dto/user.save.dto';
import RequestUserLoginDto from '../dto/user.login.dto';

// ** Guard Imports
import LocalGuard from '../passport/auth.local.guard';
import { Role } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import JwtAccessGuard from '../passport/auth.jwt-access.guard';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '유저 회원가입' })
  @ApiBody({ type: RequestUserSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '유저 생성 성공',
    type: ApiResponse,
  })
  @Post()
  async saveUser(@Body() dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    return this.authService.saveUser(dto);
  }

  @ApiOperation({ summary: '관리자 회원가입' })
  @ApiBody({ type: RequestUserSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '관리자 생성 성공',
    type: ApiResponse,
  })
  @Post('/admin')
  async saveAdmin(@Body() dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    return this.authService.saveAdmin(dto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: RequestUserLoginDto })
  @ApiCreatedResponse({
    status: 200,
    description: '로그인 성공',
    type: ApiResponse,
  })
  @UseGuards(LocalGuard)
  @Post('/local')
  async localLogin(
    @Req() request: RequestPassportDto,
  ): Promise<ApiResponse<any>> {
    return request.user;
  }

  @ApiOperation({ summary: '관리자 토큰 권한 테스트' })
  @ApiCreatedResponse({
    status: 200,
    description: '테스트 성공',
    type: ApiResponse,
  })
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/admin')
  async adminTokenTest(@Req() request: RequestPassportJwtDto) {
    return request.user;
  }

  @ApiOperation({ summary: '유저 토큰 권한 테스트' })
  @ApiCreatedResponse({
    status: 200,
    description: '테스트 성공',
    type: ApiResponse,
  })
  @Role(UserRole.USER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/user')
  async userTokenTest(@Req() request: RequestPassportJwtDto) {
    return request.user;
  }
}
