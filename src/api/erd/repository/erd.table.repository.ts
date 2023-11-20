// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Table from '../domain/table.entity';
import Columns from '../domain/column.entity';

@CustomRepository(Table)
export default class TableRepository extends Repository<Table> {
  public async findTableByWorkspaceIdAndName(
    workspaceId: number,
    name: string,
  ) {
    const qb = this.createQueryBuilder('table')
      .select(['table.id', 'table.name', 'table.comment'])
      .where('table.workspace = :workspaceId', { workspaceId })
      .andWhere('table.name = :name', { name });
    return await qb.getOne();
  }

  public async findTableById(id: number) {
    const qb = this.createQueryBuilder('table')
      .select(['table.id', 'table.name', 'table.comment', 'workspace.id'])
      .leftJoin('table.workspace', 'workspace')
      .where('table.id = :id', { id });
    return await qb.getOne();
  }

  public async findColumnByNameAndTable(columnName: string, tableId: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.name',
        'column.comment',
        'column.dataType',
        'column.isnull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('column.name = :columnName', { columnName })
      .andWhere('column.table = :tableId', { tableId })
      .getOne();
  }

  public async findColumnById(id: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.name',
        'column.comment',
        'column.dataType',
        'column.isnull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('column.id = :id', { id })
      .getOne();
  }

  public async findErd(workspaceId: number) {
    const qb = this.createQueryBuilder('table')
      .leftJoinAndSelect(Columns, 'column', 'column.table = table.id')
      .leftJoinAndSelect('column.createUser', 'column_createUser')
      .leftJoinAndSelect('column.modifyUser', 'column_modifyUser')
      .leftJoinAndSelect('table.createUser', 'table_createUser')
      .leftJoinAndSelect('table.modifyUser', 'table_modifyUser')
      .where('table.workspace = :workspaceId', { workspaceId })
      .orderBy('table.id');
    return await qb.getMany();
  }
}
