// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import CsCategoryRepository from '../repository/cs-category.repository';
import { BadRequestException } from '@hi-dice/common';

// ** enum, dto, entity, types Imports
import { NotFoundException } from '@/src/global/exception/CustomException';
import CsCategory from '../domain/cs-category.entity';
import RequestCsCategoryUpdateDto from '../dto/cs-category.update';

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

  /**
   * Existed CsCategory By Name
   * @param name
   */
  public async existedCsCategoryByName(name: string) {
    const csCategory = await this.csCategoryRepository.findOne({
      where: { name },
    });

    if (csCategory) {
      throw new BadRequestException('Already existed category name');
    }
  }

  /**
   * Existed CsCategory By Id
   * @param csCategoryId
   */
  public async existedCsCategoryById(csCategoryId: number) {
    const csCategory = await this.csCategoryRepository.findOne({
      where: { csCategoryId },
    });

    if (!csCategory) {
      throw new NotFoundException('Not Found CsCategory');
    }
  }

  /**
   * Find CsCategory List
   * @returns
   */
  public async findCsCategoryList() {
    return await this.csCategoryRepository.findAndCount();
  }

  /**
   * Delete CsCategory
   * @param csCategoryId
   */
  public async deleteCsCategory(csCategoryId: number) {
    await this.csCategoryRepository.delete(csCategoryId);
  }

  /**
   * Save CsCategory
   * @param name
   * @param adminEmail
   */
  public async saveCsCategory(name: string, adminEmail: string) {
    await this.csCategoryRepository.save(
      this.csCategoryRepository.create({
        name,
        createdId: adminEmail,
        modifiedId: adminEmail,
      }),
    );
  }

  /**
   * Update CsCategory
   * @param dto
   * @param adminEmail
   */
  public async updateCsCategory(
    dto: RequestCsCategoryUpdateDto,
    adminEmail: string,
  ) {
    await this.csCategoryRepository.update(dto.csCategoryId, {
      name: dto.name,
      modifiedId: adminEmail,
    });
  }
}
