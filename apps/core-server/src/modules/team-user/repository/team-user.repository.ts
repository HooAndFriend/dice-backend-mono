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
      ])
      .leftJoin('userTeam.team', 'team')
      .where('userTeam.userId = :userId', { userId });

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
