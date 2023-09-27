// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from 'src/repository/typeorm-ex.decorator';
import Collection from '../domain/collection.entity';

@CustomRepository(Collection)
export default class CollectionRepository extends Repository<Collection> {}
