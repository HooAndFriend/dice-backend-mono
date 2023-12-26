import { Repository } from 'typeorm';
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Mapping from '../domain/mapping.entity';

@CustomRepository(Mapping)
export default class MappingRepository extends Repository<Mapping> {}
