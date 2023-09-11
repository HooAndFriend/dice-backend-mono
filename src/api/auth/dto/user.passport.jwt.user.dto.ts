// ** enum, dto, entity Imports
import User from '../../user/domain/user.entity';

export default interface RequestPassportJwtDto extends Request {
  user: User;
}
