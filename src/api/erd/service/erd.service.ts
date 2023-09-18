// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import ErdRepository from '../repository/erd.repository';

// Other Imports

@Injectable()
export default class ErdService {
  constructor(
    private readonly erdRepository: ErdRepository,
    private readonly configService: ConfigService,
  ) {}
}
