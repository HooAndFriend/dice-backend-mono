import { Repository } from 'typeorm';
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Columns from '../domain/column.entity';

@CustomRepository(Columns)
export default class ColumnRepository extends Repository<Columns> {
  public async findColumn(tableId: number) {
    const qb = this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.name',
        'column.comment',
        'column.data_type',
        'column.isnull',
        'column.option',
        'create_user.nickname',
        'create_user.email',
        'create_user.profile',
        'modify_user.nickname',
        'modify_user.email',
        'modify_user.profile',
      ])
      .leftJoin('column.table', 'table')
      .leftJoin('column.create_user', 'create_user')
      .leftJoin('column.modify_user', 'modify_user')
      .where('column.table = :tableId', { tableId });
    return await qb.getMany();
  }

  public async findColumnByNameAndTable(columnName: string, tableId: number) {
    return this.createQueryBuilder('column')
      .select([
        'column.id',
        'table.id',
        'column.key',
        'column.name',
        'column.comment',
        'column.data_type',
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
        'column.data_type',
        'column.isnull',
        'column.option',
      ])
      .leftJoin('column.table', 'table')
      .where('column.id = :id', { id })
      .getOne();
  }

  public async deleteColumnByTable(tableId: number) {
    return this.createQueryBuilder('column')
      .delete()
      .from(Columns)
      .where('table = :tableId', { tableId })
      .execute();
  }
}
