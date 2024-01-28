// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';
import WorkspaceRepository from '../repository/workspace.repository';
import TeamRepository from '../../team/repository/team.repository';
import TeamUserRepository from '../../team-user/repository/team-user.repository';

// ** Response Imports
import CommonResponse from '../../../global/dto/api.response';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';

// ** enum, dto, entity, types Imports
import User from '../../user/domain/user.entity';
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import Role from '@/src/global/enum/Role';
import TeamUser from '../../team-user/domain/team-user.entity';

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly configService: ConfigService,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  /**
   * 개인 워크스페이스 생성
   * @param dto
   * @param user
   * @returns Workspace Entity
   */
  public async savePersonalWorkspace(dto: RequestWorksapceSaveDto, user: User) {
    return await this.workspaceRepository.save(
      this.workspaceRepository.create({
        name: dto.name,
        comment: dto.comment,
        profile: dto.profile,
        uuid: uuidv4(),
        user,
      }),
    );
  }

  /**
   * 워크스페이스 생성
   * @param dto
   * @param user
   * @returns
   */
  public async saveTeamWorksapce(
    dto: RequestWorksapceSaveDto,
    teamUser: TeamUser,
  ) {
    const workspace = this.workspaceRepository.create({
      name: dto.name,
      comment: dto.comment,
      profile: dto.profile,
      uuid: uuidv4(),
      team: teamUser.team,
      workspaceUser: [
        this.workspaceUserRepository.create({
          teamUser,
          role: Role.ADMIN,
        }),
      ],
    });

    return await this.workspaceRepository.save(workspace);
  }

  public async updateWorkspace(dto: RequestWorkspaceUpdateDto) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.id },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    await this.workspaceRepository.update(dto.id, {
      name: dto.name,
      profile: dto.profile,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '워크스페이스를 수정합니다.',
    });
  }

  public async findWorkspace(workspaceId: number) {
    const findWorkspace = await this.workspaceRepository.findWorkspace(
      workspaceId,
    );

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '워크스페이스 정보를 조회합니다.',
      data: findWorkspace,
    });
  }

  public async findMainWorkspace(workspaceId: number) {
    const findWorkspace = await this.workspaceRepository.findMainWorkspace(
      workspaceId,
    );

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '워크스페이스 정보를 조회합니다.',
      data: findWorkspace,
    });
  }

  public async findWorkspaceList(user: User, teamId: number) {
    if (teamId !== 0) {
      const [data, count] =
        await this.workspaceRepository.findWorkspaceListByTeamId(teamId);

      return CommonResponse.createPaginationResponse({
        statusCode: 200,
        message: '워크스페이스를 조회합니다.',
        data,
        count,
      });
    }

    const [data, count] =
      await this.workspaceRepository.findWorkspaceListByUserId(user.id);

    return CommonResponse.createPaginationResponse({
      statusCode: 200,
      message: '워크스페이스를 조회합니다.',
      data,
      count,
    });
  }
}
