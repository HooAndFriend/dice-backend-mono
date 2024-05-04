// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';

// ** enum, dto, entity Imports
import RequestTeamFindDto from '../dto/team.find.dto';
import { NotFoundException } from '@hi-dice/common';

@Injectable()
export default class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Find Team List
   * @param dto
   * @returns Team
   */
  public async findTeamList(dto: RequestTeamFindDto) {
    const [data, count] = await this.teamRepository.findTeamList(dto);

    return [
      data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        createdid: item.createdId,
        createdDate: item.createdDate,
        teamUserCount: item.teamUser.length,
        workspaceCount: item.workspace.length,
      })),
      count,
    ];
  }

  /**
   * Find Team
   * @param teamId
   * @returns Team
   */
  public async findTeam(teamId: number) {
    return await this.findTeamById(teamId);
  }

  /**
   * 팀 조회
   * @param teamId
   * @returns Team
   */
  private async findTeamById(teamId: number) {
    const team = await this.teamRepository.findTeamByTeamId(teamId);

    if (!team) {
      throw new NotFoundException('Team Not Found');
    }

    return team;
  }
}
