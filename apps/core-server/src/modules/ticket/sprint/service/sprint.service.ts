// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';

@Injectable()
export default class SprintService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sprintRepository: SprintRepository,
  ) {}

  private logger = new Logger(SprintService.name);
}
