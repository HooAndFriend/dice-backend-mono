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
        'request.id',
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
        'request.paramkey',
        'request.paramvalue',
      ])
      .leftJoin('collection.request', 'request')
      .where('collection.workspace = :workspaceId', {
        workspaceId,
      })
      .orderBy('collection.id', 'DESC');
    return await queryBuilder.getManyAndCount();
  }
}
