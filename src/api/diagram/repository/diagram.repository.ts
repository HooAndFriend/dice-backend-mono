// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Diagram from '../domain/diagram.entity';

@CustomRepository(Diagram)
export default class DiagramRepository extends Repository<Diagram> {}
