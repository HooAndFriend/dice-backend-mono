// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';
import QnaRepository from '../repository/qna.repository';
import RequestQnaSaveDto from '../dto/qna.save.dto';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class QnaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly qnaRepository: QnaRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  /**
   * Save Qna
   * @param dto
   */
  public async saveQna(dto: RequestQnaSaveDto) {
    await this.qnaRepository.save(
      this.qnaRepository.create({
        ...dto,
        isAnswer: false,
      }),
    );
  }
}
