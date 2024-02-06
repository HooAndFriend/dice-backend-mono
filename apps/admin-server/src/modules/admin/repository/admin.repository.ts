// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Admin from '../domain/admin.entity';

@CustomRepository(Admin)
export default class AdminRepository extends Repository<Admin> {}
