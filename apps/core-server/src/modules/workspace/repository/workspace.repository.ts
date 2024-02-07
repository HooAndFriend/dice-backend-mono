// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  public async findWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspaceUser.id',
        'workspaceUser.role',
        'teamUser.id',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('teamUser.user', 'user')
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }

  public async findMainWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
      ])
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }

  public async findWorkspaceListByUserId(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
      ])
      .where('workspace.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }

  public async findWorkspaceListByTeamId(teamId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
      ])
      .where('workspace.teamId = :teamId', { teamId });

    return await queryBuilder.getManyAndCount();
  }

  /**
   * Find Workspace Team Id
   * @param workspceId
   * @returns
   */
  public async findWorkspaceTeamId(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select(['workspace.id', 'team.id'])
      .leftJoin('workspace.team', 'team')
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }
}
