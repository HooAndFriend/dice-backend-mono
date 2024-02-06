// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

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
import RequestAdminFindDto from '../dto/admin.find.dto';
import RequestAdminUpdateDto from '../dto/admin.update.dto';

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
  public async saveAdmin(
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin 리스트 조회' })
  @ApiResponse(AdminResponse.findAdminList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAdminList(
    @Query(ValidationPipe) query: RequestAdminFindDto,
  ) {
    const [data, count] = await this.adminService.findAdminList(query);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Admin 리스트를 조회했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin 조회' })
  @ApiResponse(AdminResponse.findAdmin[200])
  @ApiResponse(AdminResponse.findAdmin[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findAdmin(@Param('id') id: number) {
    const admin = await this.adminService.findAdmin(id);

    return CommonResponse.createResponse({
      data: admin,
      statusCode: 200,
      message: 'Admin을 조회했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin 삭제' })
  @ApiResponse(AdminResponse.findAdmin[200])
  @ApiResponse(AdminResponse.findAdmin[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteAdmin(@Param('id') id: number) {
    const admin = await this.adminService.findAdmin(id);
    await this.adminService.deleteAdmin(admin.id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Admin을 삭제했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin 수정' })
  @ApiBody({ type: RequestAdminUpdateDto })
  @ApiResponse(AdminResponse.updateAdmin[200])
  @ApiResponse(AdminResponse.updateAdmin[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateAdmin(@Body() dto: RequestAdminUpdateDto) {
    await this.adminService.findAdmin(dto.adminId);
    await this.adminService.updateAdmin(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Admin을 수정했습니다.',
    });
  }
}
