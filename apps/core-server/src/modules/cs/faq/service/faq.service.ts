// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import FaqRepository from '../repository/faq.repository';

// ** enum, dto, entity, types Imports
import RequestFaqFindDto from '../dto/faq.find.dto';

@Injectable()
export default class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  private logger = new Logger(FaqService.name);

  /**
   * Find Faq List
   * @param dto
   * @returns
   */
  public async findFaqList(dto: RequestFaqFindDto) {
    return await this.faqRepository.findFaqList(dto);
  }
}
