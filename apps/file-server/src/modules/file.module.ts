import { Module } from '@nestjs/common';
import FileController from './file.controller';
import FileService from './file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export default class FileModule {}
