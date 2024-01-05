// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';

// ** Dto Imports
import Qa from '../domain/qa-comment.entity';

@CustomRepository(Qa)
export default class QaCommentRepository extends Repository<Qa> {
  public async findUser(qaId: number) {
    const queryBuilder = this.createQueryBuilder('qa')
      .select(['qa.nickname', 'qa.email', 'qa.profile'])
      .where('qa.id = :qaId', { qaId });

    return await queryBuilder.getOne();
  }
}
