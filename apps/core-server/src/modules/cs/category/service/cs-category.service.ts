// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import CsCategoryRepository from '../repository/cs-category.repository';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import CsCategory from '../domain/cs-category.entity';

@Injectable()
export default class CsCategoryService {
  constructor(private readonly csCategoryRepository: CsCategoryRepository) {}

  private logger = new Logger(CsCategoryService.name);

  /**
   * CsCategory 리스트를 조회합니다.
   */
  public async findCsCategoryById(csCategoryId: number): Promise<CsCategory> {
    const csCategory = await this.csCategoryRepository.findOne({
      where: { csCategoryId },
    });

    if (!csCategory) {
      throw new NotFoundException('Not Found CsCategory');
    }

    return csCategory;
  }
}
