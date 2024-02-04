// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports

@Injectable()
export default class WorkspaceService {
  constructor(private readonly configService: ConfigService) {}
}
