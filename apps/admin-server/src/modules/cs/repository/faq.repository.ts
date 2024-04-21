// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Faq from '../domain/faq.entity';
import RequestFaqFindDto from '../dto/faq.find.dto';

@CustomRepository(Faq)
export default class FaqRepository extends Repository<Faq> {
  /**
   * Find Faq List
   * @param dto
   * @returns
   */
  public async findFaqList(dto: RequestFaqFindDto) {
    const queryBuilder = this.createQueryBuilder('faq').select([
      'faq.id',
      'faq.question',
      'faq.category',
      'faq.createdId',
      'faq.createdDate',
      'faq.isEnabled',
    ]);

    if (dto.isExpose) {
      queryBuilder.where('faq.isExpose = :isExpose', {
        isExpose: dto.isExpose,
      });
    }

    if (dto.startDate && dto.endDate) {
      queryBuilder.andWhere('faq.createdDate BETWEEN :startDate AND :endDate', {
        startDate: dto.startDate,
        endDate: dto.endDate,
      });
    }

    if (dto.question) {
      queryBuilder.andWhere('faq.title LIKE :question', {
        question: `%${dto.question}%`,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return queryBuilder.orderBy('faq.createdDate', 'DESC').getManyAndCount();
  }
}
