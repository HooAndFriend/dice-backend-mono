// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import EpicRepository from '../repository/epic.repository';

// ** enum, dto, entity, types Imports

@Injectable()
export default class EpicService {
  constructor(private readonly epicRepository: EpicRepository) {}

  private logger = new Logger(EpicService.name);
}
