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
import VersionService from '../service/version.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';
import Admin from '../../admin/domain/admin.entity';
import CommonResponse from '@/src/global/dto/api.response';
import RequestVersionSaveDto from '../dto/version.save.dto';
import { VersionResponse } from '@/src/global/response/version.response';

// ** Dto Imports

@ApiTags('Version')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin/version', version: '1' })
export default class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Version 저장' })
  @ApiBody({ type: RequestVersionSaveDto })
  @ApiResponse(VersionResponse.saveVersion[200])
  @ApiResponse(VersionResponse.saveVersion[400])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveVersion(
    @Body() dto: RequestVersionSaveDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.versionService.existedVersion(dto.version);
    await this.versionService.saveVersion(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Version을 생성했습니다.',
    });
  }
}
