// ** enum, dto, entity Imports
import ApiResponse from '../../../global/dto/api.response';

export default interface RequestPassportDto extends Request {
  user: ApiResponse<any>;
}
