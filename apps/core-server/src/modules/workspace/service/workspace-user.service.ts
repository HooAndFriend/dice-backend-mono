// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';

// ** enum, dto, entity, types Imports
import RequestWorkspaceUpdateUpdateDto from '../dto/workspace-user.update.dto';
import Workspace from '../domain/workspace.entity';
import RequestWorkspaceUserFindDto from '../dto/workspace-user.find.dto';
import User from '../../user/domain/user.entity';
import { RoleEnum } from '@hi-dice/common';
import WorkspaceUser from '../domain/workspace-user.entity';

@Injectable()
export default class WorkspaceUserService {
  constructor(
    private readonly workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  /**
   * 워크스페이스 유저의 권한을 변경합니다.
   */
  public async updateWorksapceUserRole(
    dto: RequestWorkspaceUpdateUpdateDto,
  ): Promise<void> {
    await this.workspaceUserRepository.update(dto.id, { role: dto.role });
  }

  /**
   * 워크스페이스 유저를 저장합니다.
   */
  public async saveWorkspaceUser(
    user: User,
    workspace: Workspace,
    role: RoleEnum,
    invitedId: string,
  ): Promise<void> {
    await this.workspaceUserRepository.save(
      this.workspaceUserRepository.create({
        user,
        workspace,
        role,
        invitedId,
      }),
    );
  }

  /**
   * 워크스페이스 유저를 삭제합니다.
   */
  public async deleteWorksapceUser(workspaceUserId: number): Promise<void> {
    await this.workspaceUserRepository.delete(workspaceUserId);
  }

  /**
   * 워크스페이스 유저 리스트를 조회합니다.
   */
  public async searchWorkspaceUser(
    dto: RequestWorkspaceUserFindDto,
    workspaceId: number,
  ): Promise<[WorkspaceUser[], number]> {
    return await this.workspaceUserRepository.searchWorkspaceUser(
      dto,
      workspaceId,
    );
  }

  /**
   * 워크스페이스 생성 시의 기본 저장
   */
  public async saveInitWorkspaceUser(
    workspace: Workspace,
    user: User,
  ): Promise<WorkspaceUser> {
    return await this.workspaceUserRepository.save(
      this.workspaceUserRepository.create({
        workspace,
        user,
        role: RoleEnum.ADMIN,
        invitedId: user.email,
      }),
    );
  }

  /**
   * 초대된 유저를 워크스페이스에 저장
   */
  public async saveInviteWorkspaceUser(
    workspace: Workspace,
    user: User,
    role: RoleEnum,
    invitedId: string,
  ): Promise<void> {
    await this.workspaceUserRepository.save(
      this.workspaceUserRepository.create({
        workspace,
        user,
        role,
        invitedId,
      }),
    );
  }

  /**
   * 워크스페이스 유저 리스트 조회
   */
  public async findWorkspaceUserList(
    workspaceId: number,
  ): Promise<[WorkspaceUser[], number]> {
    return await this.workspaceUserRepository.findWorkspaceUserList(
      workspaceId,
    );
  }

  /**
   * 팀의 워크스페이스 유저 리스트 조회
   */
  public async findWorkspaceUserListByTeam(
    userId: number,
  ): Promise<[WorkspaceUser[], number]> {
    return await this.workspaceUserRepository.findWorkspaceUserListByUserId(
      userId,
    );
  }

  /**
   * 유저의 워크스페이스 리스트 조회
   */
  public async findUserWorkspaceList(
    userId: number,
  ): Promise<[WorkspaceUser[], number]> {
    return await this.workspaceUserRepository.findUserWorkspaceList(userId);
  }

  /**
   * 워크스페이스에 초대 가능한 팀 유저 리스트 조회
   */
  public async findInviteUserList(workspace: Workspace) {
    // const [teamUserList] = await this.teamUserRepository.findTeamUserList(
    //   team.id,
    // );

    // const [workspaceUserList, count] =
    //   await this.workspaceUserRepository.findWorkspaceUserList(workspace.id);

    // if (count === 0) return teamUserList;

    // return teamUserList.filter(
    //   (item) => !workspaceUserList.some((_) => _.teamUser.id === item.id),
    // );

    return [];
  }

  /**
   * 워크스페이스 유저가 존재하는지 확인합니다.
   */
  public async existedWorksapceUserById(
    workspaceUserId: number,
  ): Promise<void> {
    const workspaceUser = await this.workspaceUserRepository.exist({
      where: { workspaceUserId },
    });

    if (!workspaceUser) {
      throw new NotFoundException('Not Found Workspace User');
    }
  }
}
