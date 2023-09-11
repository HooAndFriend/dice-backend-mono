// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// Other Imports

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async save() {
    this.userRepository.findOne({ where: { id: 1 } });
  }
}
