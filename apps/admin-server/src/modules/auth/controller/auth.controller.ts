// ** Nest Imports
import { Controller, Post, Body, UseGuards, Get, Ip } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import RequestAdminLoginDto from '../dto/admin.login.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { AuthResponse } from '@/src/global/response/auth.response';
import RequestAdminReissueDto from '../dto/admin.reissue.dto';
import JwtRefreshGuard from '../passport/auth.jwt-refresh.guard';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';
import Admin from '../../admin/domain/admin.entity';
import RequestAdminFindPasswordDto from '../dto/admin.find-password.dto';

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

  @ApiOperation({ summary: '관리자 토큰 재발급' })
  @ApiBody({ type: RequestAdminReissueDto })
  @UseGuards(JwtRefreshGuard)
  @ApiResponse(AuthResponse.reissueToken[200])
  @ApiResponse(createUnauthorizedResponse())
  @Post('/reissue')
  public async reissueToken(@GetAdmin() { id, role }: Admin) {
    const token = this.authService.generateToken({ id, role });

    return CommonResponse.createResponse({
      data: token,
      statusCode: 200,
      message: 'Success Reissued Token',
    });
  }

  @ApiOperation({ summary: '비밀번호 변경 메일' })
  @ApiBody({ type: RequestAdminFindPasswordDto })
  @ApiResponse(AuthResponse.reissueToken[200])
  @Post('/password')
  public async findPassword(@Body() dto: RequestAdminFindPasswordDto) {
    await this.authService.resetPasswordSendEmail(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Success Find Password',
    });
  }
}
