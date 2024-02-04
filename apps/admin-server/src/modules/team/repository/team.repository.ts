// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Team from '../domain/team.entity';

@CustomRepository(Team)
export default class TeamRepository extends Repository<Team> {}
