// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import CsCategoryRepository from '../repository/cs-category.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@hi-dice/common';

@Injectable()
export default class CsCategoryService {
  constructor(private readonly csCategoryRepository: CsCategoryRepository) {}

  private logger = new Logger(CsCategoryService.name);

  /**
   * Find CsCategory By Id
   * @param csCategoryId
   * @returns
   */
  public async findCsCategoryById(csCategoryId: number) {
    const csCategory = await this.csCategoryRepository.findOne({
      where: { csCategoryId },
    });

    if (!csCategory) {
      throw new NotFoundException('Not Found CsCategory');
    }

    return csCategory;
  }
}
