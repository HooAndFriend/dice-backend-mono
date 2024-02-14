// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';

// ** enum, dto, entity Imports
import RequestTeamFindDto from '../dto/user.find.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';

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
    return await this.teamRepository.findTeamList(dto);
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
