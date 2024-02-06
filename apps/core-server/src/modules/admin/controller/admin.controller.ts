// ** Nest Imports
import { Body, Controller } from '@nestjs/common';

// ** Module Imports
import AdminService from '../service/admin.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin', version: '1' })
export default class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
