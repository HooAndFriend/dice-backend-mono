// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import QnaRepository from '../repository/qna.repository';

// ** enum, dto, entity, types Imports
import RequestQnaSaveDto from '../dto/qna.save.dto';
import CsCategory from '../../category/domain/cs-category.entity';

@Injectable()
export default class QnaService {
  constructor(private readonly qnaRepository: QnaRepository) {}

  private logger = new Logger(QnaService.name);

  /**
   * Save Qna
   * @param dto
   */
  public async saveQna(dto: RequestQnaSaveDto, csCategory: CsCategory) {
    await this.qnaRepository.save(
      this.qnaRepository.create({
        ...dto,
        isAnswer: false,
        csCategory,
      }),
    );
  }
}
