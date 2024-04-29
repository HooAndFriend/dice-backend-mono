// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import SprintRepository from '../repository/sprint.repository';

// ** enum, dto, entity, types Imports
import RequestSprintSaveDto from '../dto/sprint.save.dto';

@Injectable()
export default class SprintService {
  constructor(
    private readonly sprintRepository: SprintRepository,
  ) {}

  public async saveSprint(dto: RequestSprintSaveDto) {
    await this.sprintRepository.save(
      {
        name: dto.sprintName,
        startDate: dto.startDate,
        endDate: dto.endDate,
        orderId: dto.orderId,
      }
    );
  }
}
