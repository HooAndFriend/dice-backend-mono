// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import TeamUser from '../domain/team-user.entity';

@CustomRepository(TeamUser)
export default class TeamUserRepository extends Repository<TeamUser> {
  /**
   * Find Team List By userId
   * @param userId
   * @returns
   */
  public async findTeamList(userId: number) {
    const queryBuilder = this.createQueryBuilder('userTeam')
      .select([
        'userTeam.id',
        'userTeam.role',
        'team.id',
        'team.name',
        'team.profile',
        'team.uuid',
        'team.isPersonal',
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.uuid',
        'workspaceUser.id',
        'workspaceUser.role',
        'teamUser.id',
        'user.id',
      ])
      .leftJoin('userTeam.team', 'team')
      .leftJoin('team.workspace', 'workspace')
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('teamUser.user', 'user')
      .orderBy('team.isPersonal', 'DESC')
      .where('userTeam.userId = :userId', { userId })
      .andWhere('user.id = :userId', { userId })
      .andWhere('team.isPersonal = false');

    return await queryBuilder.getManyAndCount();
  }

  /**
   * Find Team User List
   * @param teamId
   * @returns
   */
  public async findTeamUserList(teamId: number) {
    const queryBuilder = this.createQueryBuilder('userTeam')
      .select([
        'userTeam.id',
        'userTeam.role',
        'user.id',
        'user.email',
        'user.nickname',
        'user.profile',
      ])
      .leftJoin('userTeam.user', 'user')
      .where('userTeam.teamId = :teamId', { teamId });

    return await queryBuilder.getManyAndCount();
  }
}
