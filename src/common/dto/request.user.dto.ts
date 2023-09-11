import { Request } from 'express';
import User from 'src/api/user/domain/user.entity';

export interface RequestWithUsernDto extends Request {
  user: User;
}
