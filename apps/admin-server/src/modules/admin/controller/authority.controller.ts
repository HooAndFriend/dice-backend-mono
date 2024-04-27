// ** Nest Imports
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import AuthorityService from '../service/authority.service';

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
import { AuthorityResponse } from '@/src/global/response/authority.response';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { CommonResponse } from '@repo/common';
import RequestAuthorityUpdateDto from '../dto/authority.update.dto';

// ** Dto Imports

@ApiTags('Authority')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/authority', version: '1' })
export default class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin Authority 조회' })
  @ApiResponse(AuthorityResponse.findAuthority[200])
  @ApiResponse(AuthorityResponse.findAuthority[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:id')
  public async findAuthority(@Param('admin id') id: number) {
    const adminAuthority = await this.authorityService.findAuthority(id);

    return CommonResponse.createResponse({
      data: adminAuthority,
      statusCode: 200,
      message: '관리자 권한을 조회했습니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Admin Authority 수정' })
  @ApiBody({ type: RequestAuthorityUpdateDto })
  @ApiResponse(AuthorityResponse.updateAuthority[200])
  @ApiResponse(AuthorityResponse.updateAuthority[404])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async updateAdmin(@Body() dto: RequestAuthorityUpdateDto) {
    await this.authorityService.findAuthority(dto.id);
    await this.authorityService.updateAuthority(dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '관리자 권한을 수정했습니다.',
    });
  }
}
