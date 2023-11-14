// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';
import RequestColumnUpdateDto from '../dto/erd.column.update.dto';
import RequestTableUpdateDto from '../dto/erd.table.update.dto';

// ** Custom Module Imports
import TableRepository from '../repository/erd.table.repository';
import User from '../../user/domain/user.entity';
import CommonResponse from '../../../common/dto/api.response';
import { DataSource } from 'typeorm';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import ColumnRepository from '../repository/erd.column.repository';

// Other Imports

@Injectable()
export default class ErdService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly columnRepository: ColumnRepository,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveTable(dto: RequestTableSaveDto, user: User) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.workspace_id },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    const findTable = await this.tableRepository.findOne({
      where: { name: dto.name },
    });

    if (findTable) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 테이블 입니다.',
      );
    }

    this.tableRepository.save({
      name: dto.name,
      comment: dto.comment,
      workspase: findWorkspace,
      create_user: user,
      modify_user: user,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '테이블을 생성합니다.',
    });
  }

  public async updateTable(id: number, dto: RequestTableUpdateDto, user: User) {
    const findTableName = await this.tableRepository.findOne({
      where: { name: dto.name },
    });

    if (findTableName) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 테이블 입니다.',
      );
    }

    const findTable = await this.tableRepository.findOne({
      where: { id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    await this.tableRepository.update(id, {
      name: dto.name,
      comment: dto.comment,
      modify_user: user,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    });
  }
  public async deleteTable(id: number) {}

  public async saveColumn(dto: RequestColumnSaveDto, user: User) {
    const findTable = await this.tableRepository.findOne({
      where: { id: dto.table_id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    const findColumn = await this.columnRepository.findOne({
      where: { name: dto.name },
    });

    if (findColumn) {
      if (findColumn.table == findTable) {
        return CommonResponse.createBadRequestException(
          '이미 사용 중인 컬럼 입니다.',
        );
      }
    }

    this.columnRepository.save({
      table: findTable,
      create_user: user,
      modify_user: user,
      key: dto.key,
      name: dto.name,
      isnull: dto.isnull,
      data_type: dto.data_type,
      option: dto.option,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 생성합니다.',
    });
  }
  public async updateColumn(id: number, dto: RequestColumnUpdateDto) {}
  public async deleteColumn(id: number) {}

  public async findErd(id: number) {}
}
