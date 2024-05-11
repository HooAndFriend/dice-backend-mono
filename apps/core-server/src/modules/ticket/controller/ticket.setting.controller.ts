// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';
import TicketSettingService from '../service/ticket.setting.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';

// ** Dto Imports
import { CommonResponse } from '@hi-dice/common';
import { RoleEnum } from '@hi-dice/common';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';

@ApiTags('Ticket Setting')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/setting', version: '1' })
export default class TicketSettingController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly ticketSettingService: TicketSettingService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 저장' })
  @ApiBody({ type: RequestSettingSaveDto })
  @ApiResponse(TicketResponse.saveSetting[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSetting(
    @Body() dto: RequestSettingSaveDto,
    @GetWorkspace() worksapce: Workspace,
  ) {
    await this.ticketSettingService.saveTicketSetting(dto, worksapce);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 수정' })
  @ApiBody({ type: RequestSettingUpdateDto })
  @ApiResponse(TicketResponse.updateSetting[200])
  @ApiResponse(TicketResponse.updateSetting[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateSetting(
    @Body() dto: RequestSettingUpdateDto,
    @GetWorkspace() worksapce: Workspace,
  ) {
    await this.ticketSettingService.updateTicketSetting(dto, worksapce);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 삭제' })
  @ApiResponse(TicketResponse.deleteSetting[200])
  @ApiResponse(TicketResponse.deleteSetting[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:settingId')
  public async deleteSetting(@Param('settingId', ParseIntPipe) id: number) {
    await this.ticketSettingService.existedTicketSettingById(id);
    await this.ticketSettingService.deleteTicketSetting(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 전체 조회' })
  @ApiResponse(TicketResponse.findSetting[200])
  @ApiResponse(TicketResponse.findSetting[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllSetting(@GetWorkspace() { id }: Workspace) {
    const [data, count] = await this.ticketSettingService.findAllSetting(id);

    return CommonResponse.createResponse({
      data: { data, count },
      message: 'Find Settings',
      statusCode: 200,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 단일 조회' })
  @ApiResponse(TicketResponse.findOneSetting[200])
  @ApiResponse(TicketResponse.findOneSetting[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:settingId')
  public async findSetting(@Param('settingId', ParseIntPipe) id: number) {
    const setting = await this.ticketSettingService.findTicketSettingById(id);

    return CommonResponse.createResponse({
      data: setting,
      message: 'Find Setting',
      statusCode: 200,
    });
  }
}
