// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import User from '../domain/user.entity';
import { UserType } from '@hi-dice/common';

@CustomRepository(User)
export default class UserRepository extends Repository<User> {
  public async findUser(userId: number) {
    const queryBuilder = this.createQueryBuilder('user')
      .select(['user.nickname', 'user.email', 'user.profile'])
      .where('user.userId = :userId', { userId });

    return await queryBuilder.getOne();
  }

  public async findUserProfileByEmailList(emailList: string[]) {
    const queryBuilder = this.createQueryBuilder('user')
      .select(['user.nickname', 'user.email', 'user.profile'])
      .where('user.email IN (:...emailList)', { emailList });

    return await queryBuilder.getMany();
  }

  public async findUserWithWorkspace(email: string) {
    const queryBuilder = this.createQueryBuilder('user')
      .select([
        'user.userId',
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
        'user.userId',
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
