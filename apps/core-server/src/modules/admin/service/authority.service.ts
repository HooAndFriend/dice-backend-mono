// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import AuthorityRepository from '../repository/authority.repository';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class AuthorityService {
  constructor(
    private readonly authorityRepository: AuthorityRepository,
    private readonly configService: ConfigService,
  ) {}
}
