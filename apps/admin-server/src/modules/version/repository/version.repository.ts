// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Version from '../domain/version.entity';
import RequestPagingDto from '@/src/global/dto/paging.dto';

@CustomRepository(Version)
export default class VersionRepository extends Repository<Version> {
  public async findVersionList(dto: RequestPagingDto) {
    const queryBuilder = this.createQueryBuilder('version').select([
      'version.id',
      'version.version',
      'version.memo',
      'version.createdId',
      'version.createdDate',
      'version.modifiedDate',
    ]);

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return await queryBuilder
      .orderBy('version.createdDate', 'DESC')
      .getManyAndCount();
  }
}
