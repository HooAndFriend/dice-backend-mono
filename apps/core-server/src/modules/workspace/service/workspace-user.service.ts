// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import RequestWorkspaceUserSaveDto from '../dto/workspace-user.save.dto';
import WorkspaceRepository from '../repository/workspace.repository';
import TeamUserRepository from '../../team/repository/team-user.repository';

// ** enum, dto, entity, types Imports
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
import Workspace from '../domain/workspace.entity';
import RequestWorkspaceUserFindDto from '../dto/workspace-user.find.dto';
import Team from '../../team/domain/team.entity';
import { LessThan } from 'typeorm';

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
    await this.workspaceUserRepository.update(dto.id, { role: dto.role });
  }

  /**
   * Save Workspace User
   * @param dto
   * @returns
   */
  public async saveWorkspaceUser(
    workspace: Workspace,
    dto: RequestWorkspaceUserSaveDto,
    invitedId: string,
  ) {
    for (const item of dto.teamUserId) {
      const teamUser = await this.teamUserRepository.findOne({
        where: { id: item },
      });

      await this.workspaceUserRepository.save(
        this.workspaceUserRepository.create({
          workspace,
          teamUser,
          invitedId,
        }),
      );
    }
  }

  /**
   * Delete Workspace User
   * @param workspaceUserId
   * @returns
   */
  public async deleteWorksapceUser(workspaceUserId: number) {
    await this.workspaceUserRepository.delete(workspaceUserId);
  }

  /**
   * Search Workspace User List
   * @param dto
   * @param workspaceId
   * @returns
   */
  public async searchWorkspaceUser(
    dto: RequestWorkspaceUserFindDto,
    workspaceId: number,
  ) {
    return await this.workspaceUserRepository.searchWorkspaceUser(
      dto,
      workspaceId,
    );
  }

  /**
   * Workspace의 유저 개수를 조회합니다.
   * @param workspaceId
   * @returns
   */
  public async findWorkspaceUserCount(workspaceId: number) {
    const worksapceUserCount = await this.workspaceUserRepository.count({
      where: { workspace: { id: workspaceId } },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterDayworksapceUserCount =
      await this.workspaceUserRepository.count({
        where: { workspace: { id: workspaceId }, createdDate: LessThan(today) },
      });

    return { worksapceUserCount, yesterDayworksapceUserCount };
  }

  /**
   * Find Workspace User List
   * @param workspaceId
   * @returns
   */
  public async findWorkspaceUserList(workspaceId: number) {
    return await this.workspaceUserRepository.findWorkspaceUserList(
      workspaceId,
    );
  }

  /**
   * Find Workspace List
   * @param teamId
   * @returns
   */
  public async findWorkspaceUserListByTeam(teamId: number, userId: number) {
    return await this.workspaceUserRepository.findWorkspaceUserListByTeam(
      teamId,
      userId,
    );
  }

  /**
   * Find User Workspace List
   * @param userId
   * @returns
   */
  public async findUserWorkspaceList(userId: number) {
    return await this.workspaceUserRepository.findUserWorkspaceList(userId);
  }

  /**
   * 워크스페이스에 초대 가능한 팀 유저 리스트 조회
   * @param workspaceId
   * @returns
   */
  public async findInviteUserList(workspace: Workspace, team: Team) {
    const [teamUserList] = await this.teamUserRepository.findTeamUserList(
      team.id,
    );

    const [workspaceUserList, count] =
      await this.workspaceUserRepository.findWorkspaceUserList(workspace.id);

    if (count === 0) return teamUserList;

    return teamUserList.filter(
      (item) => !workspaceUserList.some((_) => _.teamUser.id === item.id),
    );
  }

  /**
   * Find Workspace User By Id
   * @param workspaceUserId
   * @returns
   */
  public async existedWorksapceUserById(workspaceUserId: number) {
    const workspaceUser = await this.workspaceUserRepository.exist({
      where: { id: workspaceUserId },
    });

    if (!workspaceUser) {
      throw new NotFoundException('Not Found Workspace User');
    }
  }
}
