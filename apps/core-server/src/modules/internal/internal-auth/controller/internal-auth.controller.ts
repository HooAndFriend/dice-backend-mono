// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import UserService from '@/src/modules/user/service/user.service';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Internal Auth Controller')
@Controller({ path: '/internal/auth', version: '1' })
export default class InternalAuthController {
  constructor(private readonly userService: UserService) {}
}
