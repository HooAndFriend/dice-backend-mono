// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import Faq from '../domain/faq.entity';
import RequestFaqFindDto from '../dto/faq.find.dto';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

@CustomRepository(Faq)
export default class FaqRepository extends Repository<Faq> {
  /**
   * Find Faq List
   * @param dto
   * @returns
   */
  public async findFaqList(dto: RequestFaqFindDto) {
    const queryBuilder = this.createQueryBuilder('faq')
      .select([
        'faq.id',
        'faq.question',
        'faq.answer',
        'faq.createdDate',
        'csCategory.id',
        'csCategory.name',
      ])
      .leftJoin('faq.csCategory', 'csCategory');

    if (dto.question) {
      queryBuilder.andWhere('faq.question LIKE :question', {
        question: `%${dto.question}%`,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return queryBuilder.orderBy('faq.createdDate', 'DESC').getManyAndCount();
  }
}
