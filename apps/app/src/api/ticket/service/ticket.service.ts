// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import TicketRepository from '../repository/ticket.repository';

// ** Response Imports
import CommonResponse from '@/src/common/dto/api.response';

// Other Imports

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import { TicketStatus } from '@/src/common/enum/ticket.enum';

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly workspaceReposiotry: WorkspaceRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  // ** Ticket Service

  // ** Ticket 저장
  public async saveTicket(dto: RequestTicketSaveDto, user: User) {
    const findEpic = await this.epicRepository.findEpicById(dto.epicId);

    if (!findEpic) {
      return CommonResponse.createNotFoundException(
        'Epic 정보를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Ticket 이름은 최대 30자 입니다.',
      );
    }

    const findTicket = await this.ticketRepository.findOne({
      where: { name: dto.name },
    });

    if (findTicket) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Ticket 입니다.',
      );
    }

    await this.ticketRepository.save({
      admin: user,
      epic: findEpic,
      workspace: findEpic.workspace,
      name: dto.name,
      status: TicketStatus.ToDo,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  // ** Epic Service

  // ** Epic 저장
  public async saveEpic(dto: RequestEpicSaveDto, user: User) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Epic 이름은 최대 30자 입니다.',
      );
    }

    const findEpic = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpic) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Epic 입니다.',
      );
    }

    const [epics, count] = await this.epicRepository.findAllEpicByWorkspaceId(
      dto.workspaceId,
    );

    await this.epicRepository.save({
      admin: user,
      name: dto.name,
      workspace: findWorkspace,
      code: `${findWorkspace.name}-${count + 1}`,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    });
  }

  // ** Epic 수정
  public async updateEpic(dto: RequestEpicUpdateDto) {
    const findEpic = await this.epicRepository.findOne({
      where: { id: dto.epicId },
    });

    if (!findEpic) {
      return CommonResponse.createNotFoundException(
        'Epic 정보를 찾을 수 없습니다.',
      );
    }

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Epic 이름은 최대 30자 입니다.',
      );
    }

    const findEpicName = await this.epicRepository.findOne({
      where: { name: dto.name },
    });

    if (findEpicName) {
      return CommonResponse.createBadRequestException(
        '이미 존재하는 Epic 입니다.',
      );
    }

    await this.epicRepository.update(dto.epicId, {
      name: dto.name,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }
}
