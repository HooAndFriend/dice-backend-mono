// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Team from '../domain/team.entity';

@CustomRepository(Team)
export default class TeamRepository extends Repository<Team> {
  public async findTeam(teamId: number) {
    const queryBuilder = this.createQueryBuilder('team')
      .select([
        'team.id',
        'team.profile',
        'team.name',
        'team.description',
        'team.uuid',
      ])
      .where('team.id = :teamId', { teamId });

    return await queryBuilder.getOne();
  }
}
