// ** enum, dto, entity Imports
import ApiResponse from 'src/common/dto/api.response';

export default interface RequestPassportDto extends Request {
  user: ApiResponse<any>;
}
