// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';
import FaqRepository from '../repository/faq.repository';
import RequestFaqSaveDto from '../dto/faq.save.dto';
import RequestFaqFindDto from '../dto/faq.find.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class FaqService {
  constructor(
    private readonly configService: ConfigService,
    private readonly faqRepository: FaqRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  /**
   * Save Faq
   * @param dto
   * @param adminEmail
   * @returns
   */
  public async saveFaq(dto: RequestFaqSaveDto, adminEmail: string) {
    await this.faqRepository.save(
      this.faqRepository.create({
        question: dto.question,
        answer: dto.answer,
        category: dto.category,
        file: dto.file,
        createdId: adminEmail,
        modifiedId: adminEmail,
        isEnabled: dto.isEnabled,
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
   * Delete Faq
   * @param id
   */
  public async deleteFaq(id: number) {
    await this.faqRepository.delete(id);
  }
}
