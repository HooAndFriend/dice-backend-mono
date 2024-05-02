// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import UserService from '@/src/modules/user/service/user.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

@ApiTags('Internal User Controller')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/internal/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}
}
