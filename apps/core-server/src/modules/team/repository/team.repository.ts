// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Team from '../domain/team.entity';

@CustomRepository(Team)
export default class TeamRepository extends Repository<Team> {
  public async findPersonalTeamWithWorkspace(userEmail: string) {
    const queryBuilder = this.createQueryBuilder('team')
      .select([
        'team.id',
        'team.profile',
        'team.name',
        'team.description',
        'team.uuid',
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
        'workspaceFunction.id',
        'workspaceFunction.function',
      ])
      .leftJoin('team.workspace', 'workspace')
      .leftJoin('workspace.workspaceFunction', 'workspaceFunction')
      .where('team.createdId = :userEmail', { userEmail })
      .andWhere('team.isPersonal = true');

    return await queryBuilder.getOne();
  }

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
