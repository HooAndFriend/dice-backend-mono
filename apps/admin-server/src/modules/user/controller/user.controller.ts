// ** Nest Imports
import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { UserResponse } from '@/src/global/response/user.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Dto Imports
import RequestUserFindDto from '../dto/user.find.dto';
import CommonResponse from '@/src/global/dto/api.response';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 리스트 조회' })
  @ApiResponse(UserResponse.findUserList[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async saveAdmin(@Query(ValidationPipe) dto: RequestUserFindDto) {
    const data = await this.userService.findUserList(dto);

    return CommonResponse.createResponse({
      data: { data, count: data.length },
      statusCode: 200,
      message: '유저 리스트를 조회합니다.',
    });
  }
}
