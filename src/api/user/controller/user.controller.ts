// ** Nest Imports
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import RequestUserUpdateDto from '../dto/user.update.dto';
import { UserResponse } from 'src/response/user.response';
import JwtAccessGuard from 'src/api/auth/passport/auth.jwt-access.guard';
import { RequestWithUsernDto } from 'src/common/dto/request.user.dto';
import { WorkspaceRoleType } from 'src/common/enum/WorkspaceRoleType.enum';

@ApiTags('User')
@Controller('/api/user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: RequestUserUpdateDto })
  @ApiResponse(UserResponse.updateUser[200])
  @UseGuards(JwtAccessGuard)
  @Put('/')
  public async saveSocialUser(
    @Body() dto: RequestUserUpdateDto,
    @Req() { user }: RequestWithUsernDto,
  ) {
    return await this.userService.updateUser(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiResponse(UserResponse.findUser[200])
  @ApiResponse(UserResponse.findUser[404])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUser(@Req() { user }: RequestWithUsernDto) {
    return await this.userService.findUser(user);
  }
}
