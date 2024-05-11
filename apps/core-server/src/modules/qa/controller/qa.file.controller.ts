// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// ** Module Imports
import QaService from '../service/qa.service';
import QaFileService from '../service/qa.file.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { WorkspaceRole } from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import { GetUser } from '@/src/global/decorators/user/user.decorators';

// ** Response Imports
import { QaResponse } from '../../../global/response/qa.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Emum Imports
import {
  RoleEnum,
  CommonResponse,
  RequestQaHistoryLogSaveDto,
  QaHistoryTypeEnum,
} from '@hi-dice/common';
import RequestQaFileSaveDto from '../dto/qa-file.save.dto';
import User from '../../user/domain/user.entity';

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa/file', version: '1' })
export default class QaFileController {
  constructor(
    private readonly qaService: QaService,
    private readonly qaFileService: QaFileService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 파일 등록' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiBody({ type: RequestQaFileSaveDto })
  @ApiResponse(QaResponse.saveQaFile[200])
  @ApiResponse(QaResponse.saveQaFile[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveQaFile(
    @Body() dto: RequestQaFileSaveDto,
    @GetUser() { email }: User,
  ) {
    const qa = await this.qaService.findQaById(dto.qaId);

    await this.qaFileService.saveQaFile(qa, dto);

    this.sendQaQueue({
      qaId: qa.id,
      email: email,
      type: QaHistoryTypeEnum.UPLOAD_FILE,
      log: dto.url,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Qa File',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'QA 파일 삭제' })
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiResponse(QaResponse.deleteQaFile[200])
  @ApiResponse(QaResponse.deleteQaFile[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:fileId')
  public async deleteQaFile(
    @Param('fileId') fileId: number,
    @GetUser() { email }: User,
  ) {
    const qaFile = await this.qaFileService.findQaFile(fileId);

    await this.qaFileService.deleteQaFile(fileId);

    this.sendQaQueue({
      qaId: qaFile.qa.id,
      email: email,
      type: QaHistoryTypeEnum.DELETE_FILE,
      log: qaFile.url,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Qa File',
    });
  }

  /**
   * Send Ticket Queue
   * @param event
   */
  private sendQaQueue(event: RequestQaHistoryLogSaveDto) {
    this.eventEmitter.emit('qa.send-change-history', event);
  }
}
