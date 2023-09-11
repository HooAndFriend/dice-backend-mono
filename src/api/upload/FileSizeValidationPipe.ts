import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000;
    return value.size < oneKb;
  }
}
