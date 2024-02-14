// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import AuthorityService from '../service/authority.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('Authority')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/authority', version: '1' })
export default class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}
}
