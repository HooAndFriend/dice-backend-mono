// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Authority from '../domain/authority.entity';

@CustomRepository(Authority)
export default class AuthorityRepository extends Repository<Authority> {}
