// ** Nest Imports
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import DiagramRepository from '../repository/diagram.repository';

// ** Response Imports

// Other Imports

@Injectable()
export default class DiagramService {
  constructor(
    private readonly configService: ConfigService,
    private readonly diagramRepository: DiagramRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}
  private logger = new Logger();
}
