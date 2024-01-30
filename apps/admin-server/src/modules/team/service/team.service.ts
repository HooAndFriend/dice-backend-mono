// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';

// ** enum, dto, entity Imports

@Injectable()
export default class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly dataSource: DataSource,
  ) {}
}
