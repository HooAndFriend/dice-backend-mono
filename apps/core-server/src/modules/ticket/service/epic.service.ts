// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EpicRepository from '../repository/epic.repository';
import { NotFoundException } from '@/src/global/exception/CustomException';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class EpicService {
  constructor(
    private readonly configService: ConfigService,
    private readonly epicRepository: EpicRepository,
  ) {}

  private logger = new Logger(EpicService.name);

  /**
   * Find Epic By Id
   * @param epicId
   * @returns
   */
  public async findEpicById(epicId: number) {
    const epic = await this.epicRepository.findOne({ where: { id: epicId } });

    if (!epic) {
      throw new NotFoundException('Not Found Epic');
    }

    return epic;
  }
}
