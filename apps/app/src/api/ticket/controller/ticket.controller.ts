// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { TicketResponse } from '@/src/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../common/decorators/user.decorators';
import User from '../../user/domain/user.entity';

// ** Dto Imports
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import RequestCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestCommentUpdateDto from '../dto/comment/comment.update.dto';

@ApiTags('Workspace Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllTicket() {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 상세 조회' })
  @ApiResponse(TicketResponse.findOneTicket[200])
  @ApiResponse(TicketResponse.findOneTicket[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:ticketId')
  public async findOneTicket(@Param('ticketId') id: number) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 생성' })
  @ApiBody({ type: RequestTicketSaveDto })
  @ApiResponse(TicketResponse.saveTicket[200])
  @ApiResponse(TicketResponse.saveTicket[400])
  @ApiResponse(TicketResponse.saveTicket[404])
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTicket(
    @Body() dto: RequestTicketSaveDto,
    @GetUser() user: User,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 수정' })
  @ApiBody({ type: RequestTicketUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @ApiResponse(TicketResponse.updateTicket[400])
  @ApiResponse(TicketResponse.updateTicket[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateTicket(
    @Body() dto: RequestTicketUpdateDto,
    @GetUser() user: User,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'TICKET 삭제' })
  @ApiResponse(TicketResponse.deleteTicket[200])
  @ApiResponse(TicketResponse.deleteTicket[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/:ticketId')
  public async deleteTicket(@Param('ticketId') id: number) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'EPIC 리스트 조회' })
  @ApiResponse(TicketResponse.findAllEpic[200])
  @UseGuards(JwtAccessGuard)
  @Get('/epic')
  public async findAllEpic() {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'EPIC 상세조회' })
  @ApiResponse(TicketResponse.findOneEpic[200])
  @ApiResponse(TicketResponse.findOneEpic[404])
  @UseGuards(JwtAccessGuard)
  @Post('/epic/:epicId')
  public async findOneEpic(@Param('epciId') id: number) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'EPIC 생성' })
  @ApiBody({ type: RequestEpicSaveDto })
  @ApiResponse(TicketResponse.saveEpic[200])
  @ApiResponse(TicketResponse.saveEpic[400])
  @UseGuards(JwtAccessGuard)
  @Post('/epic')
  public async saveEpic(
    @Body() dto: RequestEpicSaveDto,
    @GetUser() user: User,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'EPIC 수정' })
  @ApiBody({ type: RequestEpicUpdateDto })
  @ApiResponse(TicketResponse.updateEpic[200])
  @ApiResponse(TicketResponse.updateEpic[400])
  @ApiResponse(TicketResponse.updateEpic[404])
  @UseGuards(JwtAccessGuard)
  @Patch('/epic')
  public async updateEpic(
    @Body() dto: RequestEpicUpdateDto,
    @GetUser() user: User,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'EPIC 삭제' })
  @ApiResponse(TicketResponse.deleteEpic[200])
  @ApiResponse(TicketResponse.deleteEpic[404])
  @UseGuards(JwtAccessGuard)
  @Delete('/epic/:epicId')
  public async deleteEpic(@Param('epicId') id: number) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'COMMENT 조회' })
  @ApiResponse(TicketResponse.findComment[200])
  @ApiResponse(TicketResponse.findComment[404])
  @UseGuards(JwtAccessGuard)
  @Get('/comment')
  public async findComment() {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'COMMENT 생성' })
  @ApiBody({ type: RequestCommentSaveDto })
  @ApiResponse(TicketResponse.saveComment[200])
  @ApiResponse(TicketResponse.saveComment[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:diagramId')
  public async saveComment(dto: RequestCommentSaveDto, @GetUser() user: User) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'COMMENT 수정' })
  @ApiBody({ type: RequestCommentUpdateDto })
  @ApiResponse(TicketResponse.updateComment[200])
  @ApiResponse(TicketResponse.updateComment[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:diagramId')
  public async updateComment(
    dto: RequestCommentUpdateDto,
    @GetUser() user: User,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'COMMENT 삭제' })
  @ApiResponse(TicketResponse.deleteComment[200])
  @ApiResponse(TicketResponse.deleteComment[404])
  @UseGuards(JwtAccessGuard)
  @Get('/:commentId')
  public async deleteComment(@Param('commentId') id: number) {}
}
