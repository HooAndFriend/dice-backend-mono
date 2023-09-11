import { Request } from 'express';
import User from 'src/api/auth/domain/user.entity';

export interface RequestWithUsernDto extends Request {
  user: User;
}
