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
        'workspaceUser.workspaceUserId',
        'workspaceUser.role',
        'user.userId',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspaceUser.user', 'user')
      .leftJoin('workspaceUser.workspace', 'workspace')
      .where('workspace.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getManyAndCount();
  }

  /**
   * Find Workspace List By Team
   * @param teamId
   * @returns
   */
  public async findWorkspaceUserListByUserId(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.workspaceUserId',
        'workspaceUser.role',
        'workspace.workspaceId',
        'workspace.name',
        'workspace.comment',
        'workspace.profile',
        'workspace.uuid',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .leftJoin('workspaceUser.user', 'user')
      .where('user.userId = :userId', { userId });

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
        'workspaceUser.workspaceUserId',
        'workspaceUser.role',
        'workspace.workspaceId',
        'workspace.name',
        'workspace.profile',
        'workspace.uuid',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .leftJoin('workspaceUser.user', 'user')
      .where('user.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }

  public async searchWorkspaceUser(
    dto: RequestWorkspaceUserFindDto,
    workspaceId: number,
  ) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.workspaceUserId',
        'workspaceUser.role',
        'user.userId',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspaceUser.user', 'user')
      .leftJoin('workspaceUser.workspace', 'workspace')
      .where('workspace.workspaceId = :workspaceId', { workspaceId });

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
