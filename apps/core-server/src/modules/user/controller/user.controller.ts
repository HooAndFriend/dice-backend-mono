// ** Nest Imports
import { Body, Controller, Get, Patch, Put, UseGuards } from '@nestjs/common';

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

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import { UserResponse } from '../../../global/response/user.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Utils Imports
import { GetUser } from '../../../global/decorators/user/user.decorators';

// ** Dto Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import User from '../domain/user.entity';
import { CommonResponse } from '@hi-dice/common';
import RequestUserFcmUpdateDto from '../dto/user-fcm.update.dto';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
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
    @GetUser() user: User,
  ) {
    await this.userService.updateUser(dto, user);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 FCM 정보 수정' })
  @ApiBody({ type: RequestUserFcmUpdateDto })
  @ApiResponse(UserResponse.updateUser[200])
  @UseGuards(JwtAccessGuard)
  @Patch('/fcm')
  public async updateUserFcm(
    @Body() dto: RequestUserFcmUpdateDto,
    @GetUser() user: User,
  ) {
    await this.userService.updateUserFcm(user.userId, dto.fcmToken);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '유저의 정보를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiResponse(UserResponse.findUser[200])
  @ApiResponse(UserResponse.findUser[404])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUser(@GetUser() user: User) {
    const findUser = await this.userService.findUser(user);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }
}
