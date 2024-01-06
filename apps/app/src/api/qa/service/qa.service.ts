// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import QaRepository from '../repository/qa.repository';

// ** Response Imports
import CommonResponse from '../../../common/dto/api.response';

// ** enum, dto, entity, types Imports
import RequestQaUpdateDto from '../dto/qa.update.dto';
import Qa from '../domain/qa.entity';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly configService: ConfigService,
  ) {}
}