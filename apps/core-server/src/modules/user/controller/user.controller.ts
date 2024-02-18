// ** Nest Imports
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';
import TeamUserService from '../../team-user/service/team-user.service';
import TicketService from '../../ticket/service/ticket.service';

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

// ** Dto Imports
import RequestUserUpdateDto from '../dto/user.update.dto';
import { GetUser } from '../../../global/decorators/user/user.decorators';
import User from '../domain/user.entity';
import CommonResponse from '@/src/global/dto/api.response';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    private readonly teamUserService: TeamUserService,
  ) {}

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
    return await this.userService.updateUser(dto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiResponse(UserResponse.findUser[200])
  @ApiResponse(UserResponse.findUser[404])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findUser(@GetUser() user: User) {
    return await this.userService.findUser(user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저의 대시보드 조회' })
  @ApiResponse(UserResponse.findDashboardInfo[200])
  @UseGuards(JwtAccessGuard)
  @Get('/dashboard')
  public async dashboardInfo(@GetUser() { id }: User) {
    const teamCount = await this.teamUserService.findTeamUserCount(id);
    const ticketCount = await this.ticketService.findMyTicketCount(id);

    return CommonResponse.createResponse({
      data: { teamCount, ticketCount },
      statusCode: 200,
      message: '유저의 대시보드 정보를 조회합니다.',
    });
  }
}
