// ** Nest Imports

// ** Custom Module Imports
import TeamUserRepository from '../repository/team-user.repository';
import TeamRepository from '../../team/repository/team.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TeamUserService {
  constructor(
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
  ) {}
}
