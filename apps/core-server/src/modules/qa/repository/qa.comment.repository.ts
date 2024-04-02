// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import QaComment from '../domain/qa.comment.entity';

@CustomRepository(QaComment)
export default class QaCommentRepository extends Repository<QaComment> {
  public async findQaComment(qaId: number) {
    const queryBuilder = this.createQueryBuilder('qaComment')
      .select([
        'qaComment.id',
        'qaComment.content',
        'qaComment.createdDate',
        'qaComment.modifiedDate',
        'user.email',
        'user.nickname',
        'user.profile',
      ])
      .leftJoin('qaComment.user', 'user')
      .where('qaComment.qaId = :qaId', { qaId });

    return await queryBuilder.getManyAndCount();
  }
}
