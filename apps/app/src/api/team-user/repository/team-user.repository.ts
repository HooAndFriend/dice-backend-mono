// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import TeamUser from '../domain/team-user.entity';

@CustomRepository(TeamUser)
export default class TeamUserRepository extends Repository<TeamUser> {
  public async findTeamList(userId: number) {
    const queryBuilder = this.createQueryBuilder('userTeam')
      .select(['userTeam.id', 'team.name', 'team.profile'])
      .leftJoin('userTeam.team', 'team')
      .where('userTeam.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }
}
