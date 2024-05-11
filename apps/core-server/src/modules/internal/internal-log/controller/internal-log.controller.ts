// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import UserService from '@/src/modules/user/service/user.service';

// ** Swagger Imports
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import { InternalGuard } from '@/src/global/decorators/internal/internal.guard';

// ** Dto Imports
import RequestUserProfileFindDto from '../dto/user.profile.find.dto';
import { CommonResponse } from '@hi-dice/common';
import { InternalResponse } from '@/src/global/response/internal.response';

@ApiTags('Internal Log Controller')
@ApiHeader({
  name: 'internal-code',
  required: true,
  description: 'Internal Code(+L1VfEs/DQoXGj4r6Hszi68S0o9ksxrw9/dtAFjsPcU=)',
  example: '+L1VfEs/DQoXGj4r6Hszi68S0o9ksxrw9/dtAFjsPcU=',
})
@Controller({ path: '/internal/log', version: '1' })
export default class InternalLogController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 프로필 이미지 조회' })
  @ApiBody({ type: RequestUserProfileFindDto })
  @ApiResponse(InternalResponse.findUserProfileList[200])
  @UseGuards(InternalGuard)
  @Post('/')
  public async findUserProfileList(@Body() dto: RequestUserProfileFindDto) {
    const userList = await this.userService.findUserProfileByEmailList(
      dto.email,
    );

    return CommonResponse.createResponse({
      data: userList,
      statusCode: 200,
      message: '유저의 정보를 조회합니다.',
    });
  }
}
