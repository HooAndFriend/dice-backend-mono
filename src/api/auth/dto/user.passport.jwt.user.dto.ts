// ** enum, dto, entity Imports
import User from '../domain/user.entity';

export default interface RequestPassportJwtDto extends Request {
  user: User;
}
