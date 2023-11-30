import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';
import { Controller } from '@nestjs/common';
import DiagramService from '../service/diagram.service';

@ApiTags('Diagram')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/diagram', version: '1' })
export default class DiagramController {
  constructor(private readonly diagramService: DiagramService) {}
}
