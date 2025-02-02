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
import VersionService from '../../version/service/version.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import { GetAdmin } from '@/src/global/decorators/admin/admin.decorators';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';
import { VersionResponse } from '@/src/global/response/version.response';
import { CommonResponse, RequestPagingDto } from '@hi-dice/common';

// ** Dto Imports
import RequestVersionSaveDto from '../../version/dto/version.save.dto';
import RequestVersionUpdateDto from '../../version/dto/version.update.dto';
import Admin from '../../admin/domain/admin.entity';

@ApiTags('Admin Version')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin/version', version: '1' })
export default class AdminVersionController {
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

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Version List 조회' })
  @ApiResponse(VersionResponse.findVersionList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findVersionList(@Query(ValidationPipe) query: RequestPagingDto) {
    const [data, count] = await this.versionService.findVersionList(query);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Version 리스트를 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Version 조회' })
  @ApiResponse(VersionResponse.findVersion[200])
  @ApiResponse(VersionResponse.findVersion[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:versionId')
  public async findVersion(@Param('versionId') versionId: number) {
    const version = await this.versionService.findVersion(versionId);

    return CommonResponse.createResponse({
      data: version,
      statusCode: 200,
      message: 'Version을 조회합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Version 삭제' })
  @ApiResponse(VersionResponse.deleteVersion[200])
  @ApiResponse(VersionResponse.deleteVersion[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:versionId')
  public async deleteVersion(@Param('versionId') versionId: number) {
    await this.versionService.existedVersionById(versionId);
    await this.versionService.deleteVersion(versionId);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Version을 삭제합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Version 수정' })
  @ApiBody({ type: RequestVersionUpdateDto })
  @ApiResponse(VersionResponse.updateVersion[200])
  @ApiResponse(VersionResponse.updateVersion[400])
  @ApiResponse(VersionResponse.updateVersion[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateVersion(
    @Body() dto: RequestVersionUpdateDto,
    @GetAdmin() { email }: Admin,
  ) {
    await this.versionService.existedVersion(dto.version);
    await this.versionService.existedVersionById(dto.versionId);
    await this.versionService.updateVersion(dto, email);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Version을 수정했습니다.',
    });
  }
}
