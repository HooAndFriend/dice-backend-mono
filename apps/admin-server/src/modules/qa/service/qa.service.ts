// ** Nest Imports
import { Injectable, NotFoundException } from '@nestjs/common';

// ** Custom Module Imports
import { DataSource } from 'typeorm';
import QaRepository from '../repository/qa.repository';
import FileRepository from '../repository/file.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';
import WorkspaceRepository from '@/src/modules/workspace/repository/workspace.repository';

// ** Response Imports

// ** enum, dto, entity, types Imports
import RequestQaFindDto from '../dto/qa.find.dto';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async findQaList(findQuery: RequestQaFindDto) {
    const [qa, count] = await this.qaRepository.findQaList(
      findQuery,
    );
    return {qa, count}
  }
}
