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
import RequestTableSaveDto from '../dto/erd.table.save.dto';
import RequestColumnSaveDto from '../dto/erd.column.save.dto';
import RequestColumnUpdateDto from '../dto/erd.column.update.dto';
import RequestTableUpdateDto from '../dto/erd.table.update.dto';
import User from '../../user/domain/user.entity';
import Columns from '../domain/column.entity';
import Table from '../domain/table.entity';

// ** Custom Module Imports
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import ColumnsRepository from '../repository/erd.column.repository';
import TableRepository from '../repository/erd.table.repository';

// ** Response Imports
import CommonResponse from '../../../common/dto/api.response';

// Other Imports

@Injectable()
export default class ErdService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly columnsRepository: ColumnsRepository,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  // ** Table Service

  // ** 테이블 저장
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

    await this.tableRepository.save({
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

  // ** 테이블 수정
  public async updateTable(id: number, dto: RequestTableUpdateDto, user: User) {
    const findTableName = await this.tableRepository.findOne({
      where: { name: dto.name },
    });

    // ** 같은 이름의 테이블이 존재하는 경우
    if (findTableName && findTableName.id != id) {
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
      modifyUser: user,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '테이블을 수정합니다.',
    });
  }

  // ** 테이블 삭제
  public async deleteTable(id: number) {
    const findTable = await this.tableRepository.findOne({
      where: { id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ** 테이블 내의 컬럼들을 먼저 삭제
      await queryRunner.manager.delete(Columns, {
        table: id,
      });

      // ** 이후 해당 테이블을 삭제
      await queryRunner.manager.delete(Table, { id });

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: '테이블을 삭제합니다.',
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  // ** Column Service

  // ** 컬럼 저장
  public async saveColumn(dto: RequestColumnSaveDto, user: User) {
    const findTable = await this.tableRepository.findOne({
      where: { id: dto.table_id },
    });

    if (!findTable) {
      return CommonResponse.createNotFoundException(
        '테이블을 찾을 수 없습니다.',
      );
    }

    const findColumn = await this.columnsRepository.findColumnByNameAndTable(
      dto.name,
      dto.table_id,
    );

    if (findColumn) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 컬럼 입니다.',
      );
    }

    await this.columnsRepository.save({
      table: findTable,
      create_user: user,
      modify_user: user,
      key: dto.key,
      name: dto.name,
      isNull: dto.isNull,
      data_type: dto.data_type,
      option: dto.option,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 생성합니다.',
    });
  }

  // ** 컬럼 수정
  public async updateColumn(dto: RequestColumnUpdateDto, user: User) {
    const findColumn = await this.columnsRepository.findColumnById(
      dto.columnId,
    );

    if (!findColumn) {
      return CommonResponse.createNotFoundException('컬럼을 찾을 수 없습니다.');
    }

    const findColumnByNameAndTable =
      await this.columnsRepository.findColumnByNameAndTable(
        dto.name,
        findColumn.table.id,
      );

    // ** 해당 테이블에 같은 이름의 컬럼이 존재하는경우
    if (findColumnByNameAndTable) {
      return CommonResponse.createBadRequestException(
        '이미 사용 중인 컬럼 입니다.',
      );
    }

    await this.columnsRepository.update(dto.columnId, {
      modifyUser: user,
      key: dto.key,
      name: dto.name,
      isNull: dto.isNull,
      dataType: dto.data_type,
      option: dto.option,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 수정합니다.',
    });
  }

  // ** 컬럼 삭제
  public async deleteColumn(id: number) {
    const findColumn = this.columnsRepository.findOne({
      where: { id },
    });

    if (!findColumn) {
      return CommonResponse.createNotFoundException('컬럼을 찾을 수 없습니다.');
    }

    await this.columnsRepository.delete(id);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '컬럼을 삭제합니다.',
    });
  }

  // ** ERD 조회 >> Table, Column을 동시에 모두 조회
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
      const column = await this.columnsRepository
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
