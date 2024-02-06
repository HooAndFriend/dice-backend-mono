// ** Nest Imports
import { Controller, Post, Body, UseGuards, Get, Ip } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

// ** Response Imports
import { createServerExceptionResponse } from '../../../global/response/common';
import RequestAdminLoginDto from '../dto/admin.login.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { AuthResponse } from '@/src/global/response/auth.response';

@ApiTags('Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '괸리자 로그인' })
  @ApiBody({ type: RequestAdminLoginDto })
  @ApiResponse(AuthResponse.adminLogin[200])
  @ApiResponse(AuthResponse.adminLogin[400])
  @ApiResponse(AuthResponse.adminLogin[404])
  @Post('/')
  public async adminLogin(@Body() dto: RequestAdminLoginDto) {
    const admin = await this.authService.adminLogin(dto);
    const token = this.authService.generateToken({
      id: admin.id,
      role: admin.role,
    });

    return CommonResponse.createResponse({
      data: {
        admin,
        token,
      },
      statusCode: 200,
      message: 'Success Admin Login',
    });
  }
}
