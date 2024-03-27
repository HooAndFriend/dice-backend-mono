// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Comment from '../domain/comment.entity';

@CustomRepository(Comment)
export default class CommentRepository extends Repository<Comment> {
  public async findQaComment(qaId: number) {
    const queryBuilder = this.createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.content',
        'user.email',
        'user.nickname',
        'user.profile',
        'comment.createdDate',
        'comment.modifiedDate',
      ])
      .leftJoin('comment.user', 'user')
      .where('comment.qaId = :qaId', { qaId });

    return await queryBuilder.getManyAndCount();
  }
}
