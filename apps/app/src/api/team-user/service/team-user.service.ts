// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';

@Injectable()
export default class TeamUserService {
  constructor(private readonly teamUserRepository: TeamUserRepository) {}
}
