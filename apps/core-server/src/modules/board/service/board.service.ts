// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';

// ** Utils Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly configService: ConfigService,
  ) {}
}
