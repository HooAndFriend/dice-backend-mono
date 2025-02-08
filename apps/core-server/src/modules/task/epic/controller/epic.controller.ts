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
import EpicService from '../service/epic.service';
import TicketSettingService from '../../ticket-setting/service/ticket.setting.service';

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
} from '@/src/global/response/common';

// ** Utils Imports
import { GetUser } from '@/src/global/decorators/user/user.decorators';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';

// ** Dto Imports
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import { CommonResponse, RoleEnum } from '@hi-dice/common';
import RequestEpicSaveDto from '../dto/epic.save.dto';
import RequestEpicUpdateDto from '../dto/epic.update.dto';
import RequestEpicOrderUpdateDto from '../dto/epic-order.update.dto';
import { EpicResponse } from '@/src/global/response/epic.response';
import RequestEpicSettingUpdateDto from '../dto/epic-setting.update.dto';

@ApiTags('Workspace Epic')
@ApiBearerAuth('access-token')
@ApiHeader({ name: 'workspace-code', required: true })
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@UseGuards(JwtAccessGuard)
@Controller({ path: '/epic', version: '1' })
export default class EpicController {
  constructor(
    private readonly epicService: EpicService,
    private readonly ticketSettingService: TicketSettingService,
  ) {}

  @ApiOperation({ summary: 'EPIC 리스트 조회 With Ticket' })
  @ApiResponse(EpicResponse.findAllEpic[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/')
  public async findAllEpic(@GetWorkspace() { workspaceId }: Workspace) {
    const { data, count } = await this.epicService.findAllEpic(workspaceId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiOperation({ summary: 'EPIC 리스트 조회' })
  @ApiResponse(EpicResponse.findEpicList[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/list')
  public async findEpicList(@GetWorkspace() { workspaceId }: Workspace) {
    const [data, count] = await this.epicService.findEpicList(workspaceId);

    return CommonResponse.createResponse({
      data: { data, count },
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC의 SETTING 수정' })
  @ApiBody({ type: RequestEpicSettingUpdateDto })
  @ApiResponse(EpicResponse.updateEpic[200])
  @ApiResponse(EpicResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/ticket-setting')
  public async updateTicketSetting(@Body() dto: RequestEpicSettingUpdateDto) {
    const epic = await this.epicService.findOne(dto.epicId);
    const ticketSetting = await this.ticketSettingService.findTicketSettingById(
      dto.settingId,
    );

    await this.epicService.updateTicketSetting(epic, ticketSetting);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'EPIC을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC 생성' })
  @ApiBody({ type: RequestEpicSaveDto })
  @ApiResponse(EpicResponse.saveEpic[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Post('/')
  public async saveEpic(
    @Body() dto: RequestEpicSaveDto,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.epicService.saveEpic(dto, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC 수정' })
  @ApiBody({ type: RequestEpicUpdateDto })
  @ApiResponse(EpicResponse.updateEpic[200])
  @ApiResponse(EpicResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/')
  public async updateEpic(@Body() dto: RequestEpicUpdateDto) {
    const epic = await this.epicService.findOne(dto.epicId);
    await this.epicService.updateEpic(epic, dto);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC Order 수정' })
  @ApiBody({ type: RequestEpicOrderUpdateDto })
  @ApiResponse(EpicResponse.updateEpic[200])
  @ApiResponse(EpicResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Patch('/order')
  public async updateEpicOrder(
    @Body() dto: RequestEpicOrderUpdateDto,
    @GetWorkspace() { workspaceId }: Workspace,
  ) {
    const epic = await this.epicService.findEpicById(dto.epicId);
    const targetEpic = await this.epicService.findEpicById(dto.targetEpicId);

    await this.epicService.updateEpicOrder(
      epic,
      targetEpic.orderId,
      workspaceId,
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC 삭제' })
  @ApiResponse(EpicResponse.deleteEpic[200])
  @ApiResponse(EpicResponse.deleteEpic[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @Delete('/:epicId')
  public async deleteEpic(@Param('epicId') id: number) {
    await this.epicService.isExistedEpicById(id);
    await this.epicService.deleteEpicById(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 삭제합니다.',
    });
  }

  @ApiOperation({ summary: 'EPIC 조회' })
  @ApiResponse(EpicResponse.findEpic[200])
  @ApiResponse(EpicResponse.findEpic[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @Get('/:epicId')
  public async findEpic(@Param('epicId', ParseIntPipe) id: number) {
    const epic = await this.epicService.findEpicDetailById(id);

    return CommonResponse.createResponse({
      data: epic,
      statusCode: 200,
      message: 'Epic을 조회합니다.',
    });
  }
}
