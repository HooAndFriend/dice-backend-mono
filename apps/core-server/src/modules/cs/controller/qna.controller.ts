// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import QnaService from '../service/qna.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('Qna')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qna', version: '1' })
export default class QnaController {
  constructor(private readonly qnaService: QnaService) {}
}
