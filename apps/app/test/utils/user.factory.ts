import * as bcrypt from 'bcryptjs';
import User from '../../src/modules/user/domain/user.entity';

export class UserFactory {
  static async user({ id = 1, username, password }): Promise<User> {
    const hash = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.password = hash;
    user.id = id;

    return user;
  }
}
