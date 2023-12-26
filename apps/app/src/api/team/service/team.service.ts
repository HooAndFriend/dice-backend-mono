// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';

@Injectable()
export default class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}
}
