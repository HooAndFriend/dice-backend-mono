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

  /**
   * Find Workspace Count And Member Count
   * @param teamId
   * @returns
   */
  public async findWorkspaceCountAndMemberCount(teamId: number) {
    const workspaceCount = await this.createQueryBuilder('workspace')
      .where('workspace.teamId = :teamId', { teamId })
      .getCount();

    const workspaceUserCount = await this.createQueryBuilder('workspace')
      .innerJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.teamId = :teamId', { teamId })
      .getCount();

    return { workspaceCount, workspaceUserCount };
  }

  /**
   * Get Workspace Ticket Count
   * @param teamId
   * @param userId
   * @returns
   */
  public async findWorkspaceTicketCount(teamId: number, userId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'COUNT(CASE WHEN ticket.status = "COMPLETED" THEN ticket.id ELSE NULL END) AS completedCount',
        'COUNT(CASE WHEN ticket.status != "COMPLETED" THEN ticket.id ELSE NULL END) AS otherStatusCount',
      ])
      .leftJoin('workspace.ticket', 'ticket', 'ticket.workerId = :userId', {
        userId,
      })
      .where('workspace.teamId = :teamId', { teamId })
      .groupBy('workspace.id');

    return await queryBuilder.getRawMany();
  }
}
