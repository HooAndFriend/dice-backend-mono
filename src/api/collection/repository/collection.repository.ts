// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Collection from '../domain/collection.entity';

@CustomRepository(Collection)
export default class CollectionRepository extends Repository<Collection> {
  public async findCollection(collectionId: number) {
    const queryBuilder = this.createQueryBuilder('collection')
      .select(['collection.id', 'collection.name'])
      .where('collection.id = :collectionId', { collectionId });

    return await queryBuilder.getOne();
  }

  public async findApiList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('collection')
      .select([
        'collection.id',
        'collection.name',
        'api.id',
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
        'api.paramkey',
        'api.paramvalue',
      ])
      .leftJoin('collection.api', 'api')
      .where('collection.workspace = :workspaceId', {
        workspaceId,
      })
      .orderBy('collection.id', 'DESC');
    return await queryBuilder.getManyAndCount();
  }
}
