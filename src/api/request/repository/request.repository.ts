// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Request from '../domain/request.entity';

@CustomRepository(Request)
export default class RequestRepository extends Repository<Request> {
  public async findApi(requestId: number) {
    const queryBuilder = this.createQueryBuilder('request')
      .select([
        'request.name',
        'request.type',
        'request.endpoint',
        'request.authtype',
        'request.headerkey',
        'request.headervalue',
        'request.headerdiscreption',
        'request.bodytype',
        'request.rawdata',
        'request.formdatakey',
        'request.formdatavalue',
      ])
      .where('request.id = :requestId', { requestId });

    return await queryBuilder.getOne();
  }
}
