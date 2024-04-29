// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import FaqRepository from '../repository/faq.repository';

// ** enum, dto, entity, types Imports
import RequestFaqSaveDto from '../dto/faq.save.dto';
import RequestFaqFindDto from '../dto/faq.find.dto';
import { NotFoundException } from '@hi-dice/common';
import RequestFaqUpdateDto from '../dto/faq.update.dto';
import CsCategory from '../domain/cs-category.entity';

@Injectable()
export default class FaqService {
  constructor(
    private readonly configService: ConfigService,
    private readonly faqRepository: FaqRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(FaqService.name);

  /**
   * Save Faq
   * @param dto
   * @param adminEmail
   * @returns
   */
  public async saveFaq(
    dto: RequestFaqSaveDto,
    adminEmail: string,
    csCategory: CsCategory,
  ) {
    console.log(1);
    await this.faqRepository.save(
      this.faqRepository.create({
        question: dto.question,
        answer: dto.answer,
        file: dto.file,
        createdId: adminEmail,
        modifiedId: adminEmail,
        isEnabled: dto.isEnabled,
        csCategory,
      }),
    );
  }

  /**
   * Find Faq List
   * @param dto
   * @returns
   */
  public async findFaqList(dto: RequestFaqFindDto) {
    return await this.faqRepository.findFaqList(dto);
  }

  /**
   * Find Faq
   */
  public async findFaq(id: number) {
    const faq = await this.faqRepository.findOne({ where: { id } });

    if (!faq) {
      throw new NotFoundException('Faq를 찾을 수 없습니다.');
    }

    return faq;
  }

  /**
   * Existed Faq By Id
   * @param faqId
   */
  public async existedFaqById(faqId: number) {
    const faq = await this.faqRepository.exist({ where: { id: faqId } });

    if (!faq) {
      throw new NotFoundException('Faq를 찾을 수 없습니다.');
    }
  }

  /**
   * Delete Faq
   * @param id
   */
  public async deleteFaq(id: number) {
    await this.faqRepository.delete(id);
  }

  /**
   * Faq Update
   * @param dto
   * @param adminEmail
   */
  public async updateFaq(
    dto: RequestFaqUpdateDto,
    adminEmail: string,
    csCategory: CsCategory,
  ) {
    await this.faqRepository.update(dto.faqId, {
      question: dto.question,
      answer: dto.answer,
      file: dto.file,
      modifiedId: adminEmail,
      isEnabled: dto.isEnabled,
      csCategory,
    });
  }
}
