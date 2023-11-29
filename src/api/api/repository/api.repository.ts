// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Api from '../domain/api.entity';

@CustomRepository(Api)
export default class ApiRepository extends Repository<Api> {
  public async findApi(apiId: number) {
    const queryBuilder = this.createQueryBuilder('api')
      .select([
        'api.name',
        'api.type',
        'api.endpoint',
        'api.authtype',
        'api.headerkey',
        'api.headervalue',
        'api.headerdiscreption',
        'api.bodytype',
        'api.rawdata',
        'api.formdatakey',
        'api.formdatavalue',
      ])
      .where('api.id = :apiId', { apiId });

    return await queryBuilder.getOne();
  }
}
