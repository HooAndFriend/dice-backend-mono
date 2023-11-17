// ** Nest Imports
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';
import RequestColumnUpdateDto from '../dto/erd.column.update.dto';
import RequestTableUpdateDto from '../dto/erd.table.update.dto';

// ** Custom Module Imports
import User from '../../user/domain/user.entity';
import CommonResponse from '../../../common/dto/api.response';
import { DataSource } from 'typeorm';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import ColumnRepository from '../repository/erd.column.repository';
import TableRepository from '../repository/erd.table.repository';

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

  // Table Service
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
      workspace: findWorkspace,
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
      if (findTableName.id != id) {
        return CommonResponse.createBadRequestException(
          '이미 사용 중인 테이블 입니다.',
        );
      }
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
      modifyUser: user,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    });
  }

  public async deleteTable(id: number) {
    const findTable = await this.tableRepository.findOne({
      where: { id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    await this.columnRepository.deleteColumnByTable(id);

    await this.tableRepository.delete(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '테이블을 삭제합니다.',
    });
  }

  // Column Service
  public async saveColumn(dto: RequestColumnSaveDto, user: User) {
    const findTable = await this.tableRepository.findOne({
      where: { id: dto.table_id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    const findColumn = await this.columnRepository.findColumnByNameAndTable(
      dto.name,
      dto.table_id,
    );

    if (findColumn) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 컬럼 입니다.',
      );
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
  public async updateColumn(dto: RequestColumnUpdateDto, user: User) {
    const findColumn = await this.columnRepository.findColumnById(dto.columnId);

    if (!findColumn) {
      return CommonResponse.createNotFoundException('컬럼을 찾을 수 없습니다.');
    }

    const findColumnByNameAndTable =
      await this.columnRepository.findColumnByNameAndTable(
        dto.name,
        findColumn.table.id,
      );

    if (findColumnByNameAndTable) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 컬럼 입니다.',
      );
    }

    await this.columnRepository.update(dto.columnId, {
      modifyUser: user,
      key: dto.key,
      name: dto.name,
      isnull: dto.isnull,
      dataType: dto.data_type,
      option: dto.option,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
    });
  }

  public async deleteColumn(id: number) {
    const findColumn = this.columnRepository.findOne({
      where: { id },
    });

    if (!findColumn) {
      return CommonResponse.createNotFoundException('컬럼을 찾을 수 없습니다.');
    }

    await this.columnRepository.delete(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 삭제합니다.',
    });
  }

  public async findErd(id: number) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException(
        '워크스페이스를 찾을 수 없습니다.',
      );
    }

    const erd = [];
    const [findTable, count] = await this.tableRepository.findTable(id);

    for (let i = 0; i < count; i++) {
      const column = await this.columnRepository
        .findColumn(findTable[i].id)
        .then((column) => {
          const tmp = { table: findTable[i], column };
          erd.push(tmp);
        });
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Erd 정보를 조회합니다.',
      data: erd,
    });
  }
}
