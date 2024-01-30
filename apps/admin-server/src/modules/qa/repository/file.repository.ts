// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import File from '../domain/file.entity';

@CustomRepository(File)
export default class FileRepository extends Repository<File> {}
