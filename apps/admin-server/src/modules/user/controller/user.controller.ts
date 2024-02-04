// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}
}
