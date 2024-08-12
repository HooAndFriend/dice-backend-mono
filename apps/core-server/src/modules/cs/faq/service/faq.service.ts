// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import FaqRepository from '../repository/faq.repository';

// ** enum, dto, entity, types Imports
import RequestFaqFindDto from '../dto/faq.find.dto';
import Faq from '../domain/faq.entity';

@Injectable()
export default class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  private logger = new Logger(FaqService.name);

  /**
   * Faq 리스트를 조회합니다.
   */
  public async findFaqList(dto: RequestFaqFindDto): Promise<[Faq[], number]> {
    return await this.faqRepository.findFaqList(dto);
  }
}
