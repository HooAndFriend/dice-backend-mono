// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import CommonResponse from '@/src/common/dto/api.response';
import RequestTeamUserSaveDto from '../dto/team-user.save.dto';

@Injectable()
export default class TeamUserService {
  constructor(private readonly teamUserRepository: TeamUserRepository) {}

  /**
   * Find Team List
   * @param userId
   * @returns
   */
  public async findTeamList(userId: number) {
    const [data, count] = await this.teamUserRepository.findTeamList(userId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find User Team List',
      data: { data, count },
    });
  }

  public async saveTeamUser(dto: RequestTeamUserSaveDto) {
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite User',
    });
  }
}
