// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import CsCategoryRepository from '../repository/cs-category.repository';

// ** enum, dto, entity, types Imports
import { BadRequestException, NotFoundException } from '@hi-dice/common';
import RequestCsCategoryUpdateDto from '../dto/cs-category.update';

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
      where: { id: csCategoryId },
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
