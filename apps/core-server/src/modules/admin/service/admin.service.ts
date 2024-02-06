// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import AdminRepository from '../repository/admin.repository';

@Injectable()
export default class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService,
  ) {}
}
