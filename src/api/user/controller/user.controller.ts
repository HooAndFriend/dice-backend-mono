// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
}
