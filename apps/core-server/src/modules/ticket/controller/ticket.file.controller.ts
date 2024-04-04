// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

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
import { GetUser } from '../../../global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { WorkspaceRole } from '@/src/global/decorators/workspace-role/workspace-role.decorator';

// ** Dto Imports
import User from '../../user/domain/user.entity';
import CommonResponse from '@/src/global/dto/api.response';
import RoleEnum from '@/src/global/enum/Role';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';
import TicketFileService from '../service/ticket.file.service';
import RequestTicketFileSaveDto from '../dto/file/file.save.dto';

@ApiTags('Ticket File')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/file', version: '1' })
export default class TicketFileController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly ticketFileService: TicketFileService,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Ticket File 생성' })
  @ApiBody({ type: RequestTicketFileSaveDto })
  @ApiResponse(TicketResponse.saveTicketFile[200])
  @ApiResponse(TicketResponse.saveTicketFile[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTicketFile(
    @Body() dto: RequestTicketFileSaveDto,
    @GetUser() user: User,
  ) {
    const ticket = await this.ticketService.findTicketById(dto.ticketId);
    await this.ticketFileService.saveTicketFile(ticket, dto.file);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Ticket File',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 삭제' })
  @ApiResponse(TicketResponse.deleteComment[200])
  @ApiResponse(TicketResponse.deleteComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:commentId')
  public async deleteComment(@Param('commentId') id: number) {
    await this.ticketService.deleteComment(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Comment',
    });
  }
}
