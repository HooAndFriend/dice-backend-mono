// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Collection from '../domain/collection.entity';

@CustomRepository(Collection)
export default class CollectionRepository extends Repository<Collection> {
  public async findCollection(collectionId: number) {
    const queryBuilder = this.createQueryBuilder('collection')
      .select([
        'collection.id',
        'collection.name',
        'createdUser.nickname',
        'modifiedUser.nickname',
      ])
      .leftJoin('collection.createdUser', 'createdUser')
      .leftJoin('collection.modifiedUser', 'modifiedUser')
      .where('collection.id = :collectionId', { collectionId });

    return await queryBuilder.getOne();
  }

  public async findApiList(collectionId: number) {
    const queryBuilder = this.createQueryBuilder('collection')
      .select([
        'collection.id',
        'collection.name',
        'apiCreatedUser.nickname',
        'apiModifiedUser.nickname',
        'api.id',
        'api.name',
        'api.type',
        'api.endpoint',
        'createdUser.nickname',
        'modifiedUser.nickname',
      ])
      .leftJoin('collection.api', 'api')
      .leftJoin('collection.createdUser', 'createdUser')
      .leftJoin('collection.modifiedUser', 'modifiedUser')
      .leftJoin('api.createdUser', 'apiCreatedUser')
      .leftJoin('api.modifiedUser', 'apiModifiedUser')
      .orderBy('collection.id')
      .where('collection.id = :collectionId', {
        collectionId,
      });

    return await queryBuilder.getManyAndCount();
  }
}
