// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';
import RequestSprintSaveDto from '../dto/sprint.save.dto';

@Injectable()
export default class SprintService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sprintRepository: SprintRepository,
  ) {}

  private logger = new Logger(SprintService.name);

  public async saveSprint(dto: RequestSprintSaveDto) {
    await this.sprintRepository.save({
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });
  }
}
