// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports

// ** Response Imports

// Other Imports

@Injectable()
export default class TicketService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();
}
