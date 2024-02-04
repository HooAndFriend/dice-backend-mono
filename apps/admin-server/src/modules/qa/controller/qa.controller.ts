// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import QaService from '../service/qa.service';
import CommentService from '../service/comment.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('QA')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/qa', version: '1' })
export default class QaController {
  constructor(
    private readonly qaService: QaService,
    private readonly commentService: CommentService,
  ) {}
}
