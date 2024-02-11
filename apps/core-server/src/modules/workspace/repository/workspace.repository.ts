// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  public async findWorkspaceByUserId(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
        'workspaceFunction.id',
        'workspaceFunction.function',
      ])
      .leftJoin('workspace.workspaceFunction', 'workspaceFunction')
      .leftJoin('workspace.team', 'team')
      .where('team.createdId = :userId', { userId })
      .andWhere('team.isPersonal = true');

    return await queryBuilder.getManyAndCount();
  }

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
        'workspaceFunction.id',
        'workspaceFunction.function',
      ])
      .leftJoin('workspace.workspaceFunction', 'workspaceFunction')
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
        'workspaceFunction.id',
        'workspaceFunction.function',
      ])
      .leftJoin('workspace.workspaceFunction', 'workspaceFunction')
      .where('workspace.teamId = :teamId', { teamId });

    return await queryBuilder.getManyAndCount();
  }

  public async findTeamWorkspaceListWithCount(teamId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
      ])
      .addSelect('COUNT(workspaceUser.id)', 'workspaceUserCount')
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.teamId = :teamId', { teamId })
      .groupBy('workspace.id');

    return await queryBuilder.getRawMany();
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
