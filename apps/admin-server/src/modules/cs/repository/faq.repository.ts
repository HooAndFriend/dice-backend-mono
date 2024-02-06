// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Faq from '../domain/faq.entity';

@CustomRepository(Faq)
export default class FaqRepository extends Repository<Faq> {}
