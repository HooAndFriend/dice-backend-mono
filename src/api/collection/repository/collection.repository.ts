// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Collection from '../domain/collection.entity';

@CustomRepository(Collection)
export default class CollectionRepository extends Repository<Collection> {
    public async findCollection(collectionId: number){
      const queryBuilder = this.createQueryBuilder('collection')
        .select([
            'collection.id',
            'collection.name',
        ])
        .where('collection.id = :collectionId', { collectionId });

      return await queryBuilder.getOne();
    }
}
