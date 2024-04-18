// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import WorkspaceUser from '../domain/workspace-user.entity';
import RequestWorkspaceUserFindDto from '../dto/workspace-user.find.dto';

@CustomRepository(WorkspaceUser)
export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {
  /**
   * Find Workspace User List
   * @param workspaceId
   * @returns
   */
  public async findWorkspaceUserList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.role',
        'teamUser.id',
        'user.id',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('teamUser.user', 'user')
      .where('workspaceUser.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getManyAndCount();
  }

  /**
   * Find Workspace List By Team
   * @param teamId
   * @returns
   */
  public async findWorkspaceUserListByTeam(teamId: number, userId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.role',
        'workspace.id',
        'workspace.name',
        'workspace.comment',
        'workspace.profile',
        'workspace.uuid',
        'workspaceFunction.id',
        'workspaceFunction.function',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('workspace.workspaceFunction', 'workspaceFunction')
      .where('workspace.teamId = :teamId', { teamId })
      .andWhere('teamUser.userId = :userId', { userId });

    return queryBuilder.getManyAndCount();
  }

  /**
   * Find User Workspace List
   * @param workspaceId
   * @returns
   */
  public async findUserWorkspaceList(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.role',
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.uuid',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .where('teamUser.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }

  public async searchWorkspaceUser(
    dto: RequestWorkspaceUserFindDto,
    workspaceId: number,
  ) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.role',
        'teamUser.id',
        'user.id',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('teamUser.user', 'user')
      .where('workspaceUser.workspaceId = :workspaceId', { workspaceId });

    if (dto.name) {
      queryBuilder
        .andWhere('user.email LIKE :email', {
          email: `%${dto.name}%`,
        })
        .orWhere('user.nickname LIKE :nickname', {
          nickname: `%${dto.name}%`,
        });
    }

    return await queryBuilder.getManyAndCount();
  }
}
