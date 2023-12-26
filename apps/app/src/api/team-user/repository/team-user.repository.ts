// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import TeamUser from '../domain/team-user.entity';

@CustomRepository(TeamUser)
export default class TeamUserRepository extends Repository<TeamUser> {}
