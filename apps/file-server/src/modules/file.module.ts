import { Module } from '@nestjs/common';
import FileController from './file.controller';
import FileService from './file.service';

@Module({
  imports: [],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export default class FileModule {}
