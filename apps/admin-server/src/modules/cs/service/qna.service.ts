// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import QnaRepository from '../repository/qna.repository';

// ** enum, dto, entity, types Imports
import RequestQnaFindDto from '../dto/qna.find.dto';
import { NotFoundException } from '@/src/global/exception/CustomException';

@Injectable()
export default class QnaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly qnaRepository: QnaRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  /**
   * Find Faq List
   * @param dto
   * @returns
   */
  public async findQnaList(dto: RequestQnaFindDto) {
    return await this.qnaRepository.findQnaList(dto);
  }

  /**
   * Find Qna
   * @param id
   * @returns
   */
  public async findQna(id: number) {
    const qna = await this.qnaRepository.findOne({ where: { id } });

    if (!qna) {
      throw new NotFoundException('Qna not found');
    }

    return qna;
  }
}
