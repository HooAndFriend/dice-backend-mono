// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import CommonResponse from '../../../global/dto/api.response';
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
      throw new NotFoundException('Not Found Workspace User');
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
      throw new NotFoundException('Not Found Workspace');
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
   * Delete Workspace User
   * @param workspaceUserId
   * @returns
   */
  public async deleteWorksapceUser(workspaceUserId: number) {
    const workspaceUser = await this.findWorkspaceUserById(workspaceUserId);

    if (!workspaceUser) {
      throw new NotFoundException('Not Found Workspace User');
    }

    await this.workspaceUserRepository.delete(workspaceUser.id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Workspace User',
    });
  }

  /**
   * Find Workspace User List
   * @param workspaceId
   * @returns
   */
  public async findWorkspaceUserList(workspaceId: number) {
    const [data, count] =
      await this.workspaceUserRepository.findWorkspaceUserList(workspaceId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace User List',
      data: { data, count },
    });
  }

  /**
   * 워크스페이스에 초대 가능한 팀 유저 리스트 조회
   * @param workspaceId
   * @returns
   */
  public async findInviteUserList(workspaceId: number) {
    const findWorkspace = await this.workspaceRepository.findWorkspaceTeamId(
      workspaceId,
    );

    if (!findWorkspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    const [teamUserList] = await this.teamUserRepository.findTeamUserList(
      findWorkspace.team.id,
    );

    const [data] = await this.workspaceUserRepository.findWorkspaceUserList(
      workspaceId,
    );

    const list = teamUserList
      .map((item) => {
        if (data.length < 1) return item;
        for (const _ of data) {
          if (item.id === _.teamUser.id) {
            return null;
          }

          return item;
        }
      })
      .filter((item) => item);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team List to invite workspace',
      data: { data: list, count: list.length },
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

  /**
   * Find Workspace By Id
   * @param workspaceId
   * @returns
   */
  private async findWorkspaceWithTeamById(workspaceId: number) {
    return await this.workspaceRepository.findOne({
      where: { id: workspaceId },
      relations: ['team'],
    });
  }

  /**
   * Find Workspace User By Id
   * @param workspaceUserId
   * @returns
   */
  private async findWorkspaceUserById(workspaceUserId: number) {
    return await this.workspaceUserRepository.findOne({
      where: { id: workspaceUserId },
    });
  }
}
