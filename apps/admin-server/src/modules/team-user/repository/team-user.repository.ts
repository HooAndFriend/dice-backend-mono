// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import TeamUser from '../domain/team-user.entity';

@CustomRepository(TeamUser)
export default class TeamUserRepository extends Repository<TeamUser> {
  /**
   * 유저의 팀 리스트 조회
   * @param userId
   * @returns
   */
  public async findTeamUserList(userId: number) {
    const queryBuilder = this.createQueryBuilder('teamUser')
      .select([
        'teamUser.id',
        'teamUser.createdDate',
        'teamUser.role',
        'team.name',
      ])
      .leftJoin('teamUser.team', 'team')
      .where('teamUser.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }
}
