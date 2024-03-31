// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import FileDownloadLog from '../domain/file-download-log.entity';

@CustomRepository(FileDownloadLog)
export default class FileDownloadLogRepository extends Repository<FileDownloadLog> {}
