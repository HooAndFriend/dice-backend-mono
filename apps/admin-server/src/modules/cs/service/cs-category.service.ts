// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import CsCategoryRepository from '../repository/cs-category.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';

@Injectable()
export default class CsCategoryService {
  constructor(
    private readonly configService: ConfigService,
    private readonly csCategoryRepository: CsCategoryRepository,
  ) {}

  private logger = new Logger(CsCategoryService.name);

  /**
   * Find CsCategory By Id
   * @param csCategoryId
   * @returns
   */
  public async findCsCategoryById(csCategoryId: number) {
    const csCategory = await this.csCategoryRepository.findOne({
      where: { id: csCategoryId },
    });

    if (!csCategory) {
      throw new NotFoundException('Not Found CsCategory');
    }

    return csCategory;
  }
}
