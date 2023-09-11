// ** Nest Imports
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

// ** Swagger Imports
import { ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

// ** Other Imports
import { diskStorage } from 'multer';
import { extname } from 'path';

// ** enum, dto, entity Imports
import ApiResponse from 'src/common/dto/api.response';

@ApiTags('upload')
@Controller('/api/upload')
export default class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: '파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '파일 업로드',
    type: 'multipart/form-data',
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    return ApiResponse.of({
      data: {
        filename: file.filename,
        filepath: `${this.configService.get('SERVER_URL')}/file/${
          file.filename
        }`,
      },
      message: 'Upload File',
      statusCode: 200,
    });
  }
}
