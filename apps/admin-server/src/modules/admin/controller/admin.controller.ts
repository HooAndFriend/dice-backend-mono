// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import AdminService from '../service/admin.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { AdminResponse } from '@/src/global/response/admin.response';

// ** Dto Imports
import RequestAdminSaveDto from '../dto/admin.save.dto';
import Admin from '../domain/admin.entity';
import CommonResponse from '@/src/global/dto/api.response';

@ApiTags('Admin')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin', version: '1' })
export default class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin 생성' })
  @ApiBody({ type: RequestAdminSaveDto })
  @ApiResponse(AdminResponse.saveAdmin[200])
  @ApiResponse(AdminResponse.saveAdmin[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveFaq(
    @Body() dto: RequestAdminSaveDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.adminService.isExistAdmin(dto.email);
    await this.adminService.saveAdmin(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Admin을 생성했습니다.',
    });
  }
}
