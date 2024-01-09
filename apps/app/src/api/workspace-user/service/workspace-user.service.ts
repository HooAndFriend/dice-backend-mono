// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import CommonResponse from '../../../common/dto/api.response';
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import RequestWorkspaceUserSaveDto from '../dto/workspace-user.save.dto';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import TeamUserRepository from '../../team-user/repository/team-user.repository';

@Injectable()
export default class WorkspaceUserService {
  constructor(
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Update Workspace User
   * @param dto
   * @returns
   */
  public async updateWorksapceUserRole(dto: RequestWorkspaceUpdateUpdateDto) {
    const findWorkspaceUser = await this.workspaceUserRepository.findOne({
      where: { id: dto.id },
    });

    if (!findWorkspaceUser) {
      return CommonResponse.createNotFoundException(
        '워크스페이스에서 유저의 정보를 찾을 수 없습니다.',
      );
    }

    await this.workspaceUserRepository.update(dto.id, { role: dto.role });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '워크스페이스에서 유저의 권한을 수정합니다.',
    });
  }

  /**
   * Save Workspace User
   * @param dto
   * @returns
   */
  public async saveWorkspaceUser(dto: RequestWorkspaceUserSaveDto) {
    const findWorkspace = await this.findWorkspaceById(dto.workspaceId);

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException('Not Found Workspace');
    }

    for (const item of dto.teamUserId) {
      const teamUser = await this.teamUserRepository.findOne({
        where: { id: item },
      });

      await this.workspaceUserRepository.save(
        this.workspaceUserRepository.create({
          workspace: findWorkspace,
          teamUser,
        }),
      );
    }

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite Worksapce User',
    });
  }

  /**
   * Find Workspace By Id
   * @param workspaceId
   * @returns
   */
  private async findWorkspaceById(workspaceId: number) {
    return await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });
  }
}
