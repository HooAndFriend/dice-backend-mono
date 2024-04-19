// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import BoardService from '../service/board.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Utils Imports

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';

// ** Dto Imports

@ApiTags('Board')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/board', version: '1' })
export default class BoardController {
  constructor(private readonly boardService: BoardService) {}
}
