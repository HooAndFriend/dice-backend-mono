// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import User from '../domain/user.entity';
import { UserType } from '@repo/common';

@CustomRepository(User)
export default class UserRepository extends Repository<User> {
  public async findUser(userId: number) {
    const queryBuilder = this.createQueryBuilder('user')
      .select(['user.nickname', 'user.email', 'user.profile'])
      .where('user.id = :userId', { userId });

    return await queryBuilder.getOne();
  }

  public async findUserWithWorkspace(email: string) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.nickname',
        'user.email',
        'user.fcmToken',
        'user.profile',
        'user.password',
      ])
      .where('user.email = :email', { email });

    return await queryBuilder.getOne();
  }

  public async findUserWithWorkspaceByToken(token: string, type: UserType) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.nickname',
        'user.fcmToken',
        'user.email',
        'user.profile',
        'user.password',
      ])
      .where('user.token = :token', { token })
      .andWhere('user.type = :type', { type });

    return await queryBuilder.getOne();
  }
}
