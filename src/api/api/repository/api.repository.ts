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
        'createdUser.nickname',
        'modifiedUser.nickname',
      ])
      .leftJoin('api.createdUser', 'createdUser')
      .leftJoin('api.modifiedUser', 'modifiedUser')
      .where('api.id = :apiId', { apiId });

    return await queryBuilder.getOne();
  }
}
