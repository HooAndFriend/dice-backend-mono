// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Version from '../domain/version.entity';

@CustomRepository(Version)
export default class VersionRepository extends Repository<Version> {}
