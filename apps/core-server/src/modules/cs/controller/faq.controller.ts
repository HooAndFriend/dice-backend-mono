// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import FaqService from '../service/faq.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('Faq')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/faq', version: '1' })
export default class FaqController {
  constructor(private readonly faqService: FaqService) {}
}
