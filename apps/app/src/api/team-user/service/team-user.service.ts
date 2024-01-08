// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import CommonResponse from '@/src/common/dto/api.response';
import RequestTeamUserSaveDto from '../dto/team-user.save.dto';
import RequestTeamUserUpdateDto from '../dto/team-user.update.dto';

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

  /**
   * Save Team User
   * @param dto
   * @returns
   */
  public async saveTeamUser(dto: RequestTeamUserSaveDto) {
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Invite User',
    });
  }

  /**
   * Delete Team User
   * @param teamUserId
   * @returns
   */
  public async deleteTeamUser(teamUserId: number) {
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Team User',
    });
  }

  /**
   * Update Team User Role
   * @param dto
   * @returns
   */
  public async updateTeamUserRole(dto: RequestTeamUserUpdateDto) {
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Team User Role',
    });
  }

  /**
   * Find Team User List
   * @param teamId
   * @returns
   */
  public async findTeamUserList(teamId: number) {
    const [data, count] = await this.teamUserRepository.findTeamUserList(
      teamId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Team User List',
      data: { data, count },
    });
  }
}
