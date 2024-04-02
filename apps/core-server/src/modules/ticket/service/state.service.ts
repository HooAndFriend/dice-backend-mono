// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import StateRepository from '../repository/state.repository';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly configService: ConfigService,
  ) {}
}
