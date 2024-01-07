// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import CommonResponse from '@/src/common/dto/api.response';

@Injectable()
export default class TeamUserService {
  constructor(private readonly teamUserRepository: TeamUserRepository) {}

  public async findTeamList(userId: number) {
    const [data, count] = await this.teamUserRepository.findTeamList(userId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find User Team List',
      data: { data, count },
    });
  }
}
