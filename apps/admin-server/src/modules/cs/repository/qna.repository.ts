// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Qna from '../domain/qna.entity';
import RequestQnaFindDto from '../dto/qna.find.dto';

@CustomRepository(Qna)
export default class QnaRepository extends Repository<Qna> {
  /**
   * Find Qna List
   * @param dto
   * @returns
   */
  public async findQnaList(dto: RequestQnaFindDto) {
    const queryBuilder = this.createQueryBuilder('qna').select([
      'qna.id',
      'qna.title',
      'qna.category',
      'qna.name',
      'qna.email',
      'qna.isAnswer',
      'qna.answerDate',
      'qna.createdDate',
    ]);

    if (dto.isAnswer) {
      queryBuilder.where('qna.isAnswer = :isAnswer', {
        isAnswer: dto.isAnswer,
      });
    }

    if (dto.startDate && dto.endDate) {
      queryBuilder.andWhere('qna.createdDate BETWEEN :startDate AND :endDate', {
        startDate: dto.startDate,
        endDate: dto.endDate,
      });
    }

    if (dto.category) {
      queryBuilder.andWhere('qna.category = :category', {
        category: dto.category,
      });
    }

    if (dto.question) {
      queryBuilder.andWhere('qna.title LIKE :question', {
        question: `%${dto.question}%`,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return queryBuilder.orderBy('qna.createdDate', 'DESC').getManyAndCount();
  }
}
