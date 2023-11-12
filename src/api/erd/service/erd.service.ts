// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import ErdRepository from '../repository/erd.repository';
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';

// Other Imports

@Injectable()
export default class ErdService {
  constructor(
    private readonly erdRepository: ErdRepository,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger();

  public async saveTable(dto: RequestTableSaveDto) {}
  public async updateTable(id: number, dto: RequestTableSaveDto) {}
  public async deleteTable(id: number) {}
  public async findAllTable(id: number) {}

  public async saveColumn(dto: RequestColumnSaveDto) {}
  public async updateColumn(id: number, dto: RequestColumnSaveDto) {}
  public async deleteColumn(id: number) {}
  public async findAllColumn(id: number) {}
}
