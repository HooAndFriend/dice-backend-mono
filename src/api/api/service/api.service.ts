// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import ApiRepository from '../repository/api.repository';

// Other Imports

@Injectable()
export default class ApiService {
  constructor(
    private readonly apiRepository: ApiRepository,
    private readonly configService: ConfigService,
  ) {}
}
