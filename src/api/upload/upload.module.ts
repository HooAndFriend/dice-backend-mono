import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import UploadController from './controller/upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UploadController],
})
export default class UploadModule {}
