// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import QaFile from '../domain/qa.file.entity';

@CustomRepository(QaFile)
export default class FileRepository extends Repository<QaFile> {}
