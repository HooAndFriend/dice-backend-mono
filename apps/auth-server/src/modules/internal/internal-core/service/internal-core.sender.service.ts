// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class InternalCoreSenderService {
  constructor(private readonly configService: ConfigService) {}
}
