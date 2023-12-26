// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Module Imports
import DiagramService from '../service/diagram.service';

// ** Utils Imports

// ** Dto Imports

@ApiTags('Diagram')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/diagram', version: '1' })
export default class DiagramController {
  constructor(private readonly diagramService: DiagramService) {}
}
