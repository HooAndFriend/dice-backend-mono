// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Dto Imports

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/response/common';
import CollectionService from '../service/collection.service';

@ApiTags('Workspace Collection')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller('/api/workspace/collection')
export default class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
}
