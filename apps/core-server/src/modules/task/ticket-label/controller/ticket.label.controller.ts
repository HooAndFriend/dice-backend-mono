// ** Nest Imports
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import TicketLabelService from '../service/ticket.label.service';

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
import JwtAccessGuard from '@/src/modules/auth/passport/auth.jwt-access.guard';
import RequestLabelSaveDto from '../dto/label.save.dto';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';

// ** Dto Imports
import { TicketResponse } from '@/src/global/response/ticket.response';
import Workspace from '@/src/modules/workspace/domain/workspace.entity';
import { CommonResponse, RoleEnum } from '@hi-dice/common';

@ApiTags('Ticket Label')
@ApiBearerAuth('access-token')
@ApiHeader({ name: 'workspace-code', required: true })
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@UseGuards(JwtAccessGuard)
@Controller({ path: '/ticket/label', version: '1' })
export default class TicketLabelController {
  constructor(private readonly ticketLabelService: TicketLabelService) {}

  @ApiOperation({ summary: 'Label 저장' })
  @ApiBody({ type: RequestLabelSaveDto })
  @ApiResponse(TicketResponse.saveSetting[200])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveLabel(
    @Body() dto: RequestLabelSaveDto,
    @GetWorkspace() worksapce: Workspace,
  ) {
    await this.ticketLabelService.save(dto, worksapce);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Label',
    });
  }
}
