// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import QaRepository from '../repository/qa.repository';
import QaFileRepository from '../repository/qa.file.repository';

// ** enum, dto, entity, types Imports
import RequestQaFindDto from '../dto/qa.find.dto';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly qaFileRepository: QaFileRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async findQaListByQuery(findQuery: RequestQaFindDto) {
    const [qa, count] = await this.qaRepository.findQaListByQuery(findQuery);
    return { qa, count };
  }
}
