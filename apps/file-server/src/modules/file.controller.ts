// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import FileService from './file.service';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '@/src/global/response/common';

@ApiTags('File')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/', version: '1' })
export default class FileController {
  constructor(private readonly fileService: FileService) {}
}
