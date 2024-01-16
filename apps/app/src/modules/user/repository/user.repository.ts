// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import User from '../domain/user.entity';

@CustomRepository(User)
export default class UserRepository extends Repository<User> {
  public async findUser(userId: number) {
    const queryBuilder = this.createQueryBuilder('user')
      .select(['user.nickname', 'user.email', 'user.profile'])
      .where('user.id = :userId', { userId });

    return await queryBuilder.getOne();
  }
}
