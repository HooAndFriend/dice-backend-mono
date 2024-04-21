// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import CsCategoryService from '../service/cs-category.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('Cs Category')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/cs-category', version: '1' })
export default class CsCategoryController {
  constructor(private readonly csCategoryService: CsCategoryService) {}
}
