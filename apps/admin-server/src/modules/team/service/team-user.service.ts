// ** Nest Imports

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import TeamRepository from '../repository/team.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TeamUserService {
  constructor(
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  /**
   * 유저의 팀 리스트 조회
   * @param userId
   * @returns
   */
  public async findTeamUserList(userId: number) {
    return await this.teamUserRepository.findTeamUserList(userId);
  }
}
