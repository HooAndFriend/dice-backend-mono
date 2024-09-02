// ** Nest Imports
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// ** Module Imports
import AdminService from '../../admin/service/admin.service';
import AdminAuthService from '../service/admin.auth.service';

// ** Swagger Imports
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

// ** Utils Imports
import { GetAdmin } from '@/src/global/decorators/admin/admin.decorators';
import JwtRefreshGuard from '../passport/auth.jwt-refresh.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import RequestAdminLoginDto from '../dto/admin.login.dto';
import { CommonResponse } from '@hi-dice/common';
import { AdminAuthResponse } from '@/src/global/response/admin.auth.response';

// ** Dto Imports
import RequestAdminReissueDto from '../dto/admin.reissue.dto';
import Admin from '../../admin/domain/admin.entity';

@ApiTags('Admin Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/admin/auth', version: '1' })
export default class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly adminService: AdminService,
  ) {}

  @ApiOperation({ summary: '괸리자 로그인' })
  @ApiBody({ type: RequestAdminLoginDto })
  @ApiResponse(AdminAuthResponse.adminLogin[200])
  @ApiResponse(AdminAuthResponse.adminLogin[400])
  @ApiResponse(AdminAuthResponse.adminLogin[404])
  @Post('/')
  public async adminLogin(@Body() dto: RequestAdminLoginDto) {
    const admin = await this.adminService.findOneByEmail(dto.email);
    await this.adminService.validationPassword(admin, dto.password);
    const token = this.authService.generateToken(admin);

    return CommonResponse.createResponse({
      data: {
        admin: {
          email: admin.email,
          nickname: admin.nickname,
          role: admin.role,
          profile: admin.profile,
        },
        token,
      },
      statusCode: 200,
      message: 'Success Admin Login',
    });
  }

  @ApiOperation({ summary: '관리자 토큰 재발급' })
  @ApiBody({ type: RequestAdminReissueDto })
  @UseGuards(JwtRefreshGuard)
  @ApiResponse(AdminAuthResponse.reissueToken[200])
  @ApiResponse(createUnauthorizedResponse())
  @Post('/reissue')
  public async reissueToken(@GetAdmin() admin: Admin) {
    const accessToken = this.authService.reissueToken(admin);

    return CommonResponse.createResponse({
      data: { accessToken },
      statusCode: 200,
      message: 'Success Reissued Token',
    });
  }

  // @ApiOperation({ summary: '비밀번호 변경 메일' })
  // @ApiBody({ type: RequestAdminFindPasswordDto })
  // @ApiResponse(AdminAuthResponse.findPassword[200])
  // @ApiResponse(AdminAuthResponse.findPassword[404])
  // @Post('/password')
  // public async findPassword(@Body() dto: RequestAdminFindPasswordDto) {
  //   await this.authService.resetPasswordSendEmail(dto);

  //   return CommonResponse.createResponseMessage({
  //     statusCode: 200,
  //     message: 'Success Find Password',
  //   });
  // }

  // @ApiOperation({ summary: '비밀번호 변경' })
  // @ApiBody({ type: RequestAdminUpdatePasswordDto })
  // @ApiResponse(AdminAuthResponse.updatePassword[200])
  // @ApiResponse(AdminAuthResponse.updatePassword[404])
  // @Patch('/password')
  // public async updatePassword(@Body() dto: RequestAdminUpdatePasswordDto) {
  //   await this.authService.existedAdminById(dto.id);
  //   await this.authService.updatePassword(dto);

  //   return CommonResponse.createResponseMessage({
  //     statusCode: 200,
  //     message: 'Success Update Password',
  //   });
  // }
}
