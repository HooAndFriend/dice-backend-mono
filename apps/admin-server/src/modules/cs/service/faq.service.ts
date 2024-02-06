// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';
import FaqRepository from '../repository/faq.repository';
import RequestFaqSaveDto from '../dto/faq.save.dto';

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
        createdId: adminEmail,
        modifiedId: adminEmail,
        isEnabled: true,
      }),
    );
  }
}
