// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';
import RequestTeamFindDto from '../dto/user.find.dto';

// ** enum, dto, entity Imports

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
}
