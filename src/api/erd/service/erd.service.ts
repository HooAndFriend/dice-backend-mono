// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';
import RequestColumnUpdateDto from '../dto/erd.column.update.dto';
import RequestTableUpdateDto from '../dto/erd.table.update.dto';
import TableRepository from '../repository/erd.table.repository';

// Other Imports

@Injectable()
export default class ErdService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger();

  public async saveTable(dto: RequestTableSaveDto) {}
  public async updateTable(id: number, dto: RequestTableUpdateDto) {}
  public async deleteTable(id: number) {}

  public async saveColumn(dto: RequestColumnSaveDto) {}
  public async updateColumn(id: number, dto: RequestColumnUpdateDto) {}
  public async deleteColumn(id: number) {}

  public async findErd(id: number) {}
}
