// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Team from '../domain/team.entity';
import RequestTeamFindDto from '../dto/team.find.dto';

@CustomRepository(Team)
export default class TeamRepository extends Repository<Team> {
  /**
   * Find Team List
   * @param dto
   * @returns Find Team List
   */
  public async findTeamList(dto: RequestTeamFindDto) {
    const queryBuilder = this.createQueryBuilder('team')
      .select([
        'team.id',
        'team.name',
        'team.description',
        'team.createdId',
        'team.createdDate',
      ])
      .addSelect('COUNT(teamUser.id)', 'teamUserCount')
      .addSelect('COUNT(workspace.id)', 'workspaceCount')
      .leftJoin('team.teamUser', 'teamUser')
      .leftJoin('team.workspace', 'workspace')
      .groupBy('team.id');

    if (dto.name) {
      queryBuilder.where('team.name like :name', {
        name: `%${dto.name}%`,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip((dto.page - 1) * dto.pageSize).take(dto.pageSize);
    }

    if (dto.createdId) {
      queryBuilder.andWhere('team.createdId like :createdId', {
        createdId: `%${dto.createdId}%`,
      });
    }

    if (dto.description) {
      queryBuilder.andWhere('team.description like :description', {
        description: `%${dto.description}%`,
      });
    }

    if (dto.createdStartDate && dto.createdEndDate) {
      queryBuilder.andWhere(
        'team.createdDate between :createdStartDate and :createdEndDate',
        {
          createdStartDate: dto.createdStartDate,
          createdEndDate: dto.createdEndDate,
        },
      );
    }

    return await queryBuilder.getRawMany();
  }

  /**
   * Team 조회
   * @param teamId
   * @returns Team
   */
  public async findTeamByTeamId(teamId: number) {
    const queryBuilder = this.createQueryBuilder('team')
      .select([
        'team.id',
        'team.name',
        'team.description',
        'team.createdId',
        'team.createdDate',
      ])
      .where('team.id = :teamId', { teamId });

    return await queryBuilder.getOne();
  }
}
