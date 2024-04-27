// ** Nest Imports
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// ** Module Imports
import FileService from './file.service';

// ** Swagger Imports
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import { createServerExceptionResponse } from '@/src/global/response/common';
import { CommonResponse } from '@repo/common';
import { FileResponse } from '../global/response/file.response';

@ApiTags('File')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/', version: '1' })
export default class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '소셜 유저 생성' })
  @ApiResponse(FileResponse.uploadFile[200])
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.fileService.uploadFile(file);

    return CommonResponse.createResponse({
      data,
      statusCode: 200,
      message: 'Success Upload File',
    });
  }
}
