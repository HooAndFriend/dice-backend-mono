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

// ** Response Imports

// Other Imports

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import CommonResponse from '@/src/common/dto/api.response';

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
    private readonly workspaceReposiotry: WorkspaceRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  // ** EPIC Service

  // ** EPIC 저장
  public async saveEpic(dto: RequestEpicSaveDto, user: User) {
    const findWorkspace = await this.workspaceReposiotry.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
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

    if (dto.name.length > 30) {
      return CommonResponse.createBadRequestException(
        'Epic 이름은 최대 30자 입니다.',
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
}
