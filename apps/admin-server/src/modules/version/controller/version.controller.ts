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
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetAdmin } from '@/src/global/decorators/user/admin.decorators';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { VersionResponse } from '@/src/global/response/version.response';

// ** Dto Imports
import Admin from '../../admin/domain/admin.entity';
import CommonResponse from '@/src/global/dto/api.response';
import RequestVersionSaveDto from '../dto/version.save.dto';
import RequestPagingDto from '@/src/global/dto/paging.dto';

@ApiTags('Version')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/version', version: '1' })
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
  @Get('/:id')
  public async findVersion(@Param('id') id: number) {
    const version = await this.versionService.findVersion(id);

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
  @Delete('/:id')
  public async deleteVersion(@Param('id') id: number) {
    await this.versionService.existedVersionById(id);
    await this.versionService.deleteVersion(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Version을 삭제합니다.',
    });
  }
}
