// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Api from '../domain/api.entity';

@CustomRepository(Api)
export default class ApiRepository extends Repository<Api> {}
