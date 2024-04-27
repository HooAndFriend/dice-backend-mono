// ** Nest Imports
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import QnaRepository from '../repository/qna.repository';

// ** enum, dto, entity, types Imports
import RequestQnaFindDto from '../dto/qna.find.dto';
import { BadRequestException, NotFoundException } from '@repo/common';
import RequestQnaAnswerDto from '../dto/qna.answer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SendMailDto } from '@repo/common';
import Qna from '../domain/qna.entity';

@Injectable()
export default class QnaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly qnaRepository: QnaRepository,
    @Inject('RMQ_PUSH_QUE') private readonly rmqClient: ClientProxy,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(QnaService.name);

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

  /**
   * Answer Qna
   * @param dto
   * @param adminEmail
   */
  public async answerQna(dto: RequestQnaAnswerDto, adminEmail: string) {
    await this.qnaRepository.update(dto.qnaId, {
      isAnswer: true,
      answer: dto.answer,
      file: dto.file,
      answerDate: new Date(),
      answerId: adminEmail,
    });
  }

  /**
   * Send Answe Mail
   * @param email
   * @param text
   */
  public async sendMail(email: string, text: string) {
    const sendMail = new SendMailDto(
      email,
      '[DICE] 문의 답변 드립니다.',
      text,
      '',
    );

    this.rmqClient
      .send<SendMailDto>('send-single-mail', sendMail)
      .toPromise()
      .catch((err) => {
        this.logger.log(err);
      });
  }

  /**
   * Validation Answer Qna
   * @param qna
   */
  public async validationQnaAnswer(qna: Qna) {
    if (qna.isAnswer) {
      throw new BadRequestException('이미 답변된 Qna 입니다.');
    }
  }
}
