// ** Typeorm Imports
import { QueryBuilder, Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Table from '../domain/table.entity';

@CustomRepository(Table)
export default class TableRepository extends Repository<Table> {
  public async findTableByWorkspaceIdAndName(
    workspaceId: number,
    name: string,
  ) {
    const querybuilder = this.createQueryBuilder('table')
      .select(['table.id', 'table.name', 'table.comment'])
      .where('table.workspace = :workspaceId', { workspaceId })
      .andWhere('table.name = :name', { name });
    return await querybuilder.getOne();
  }

  public async findTableById(id: number) {
    const querybuilder = this.createQueryBuilder('table')
      .select(['table.id', 'table.name', 'table.comment', 'workspace.id'])
      .leftJoin('table.workspace', 'workspace')
      .where('table.id = :id', { id });
    return await querybuilder.getOne();
  }

  public async findErd(diagramId: number) {
    const querybuilder = this.createQueryBuilder('table')
      .select([
        'table.id',
        'table.name',
        'table.comment',
        'table_createUser.nickname',
        'table_createUser.email',
        'table_createUser.profile',
        'table_modifyUser.nickname',
        'table_modifyUser.email',
        'table_modifyUser.profile',
        'column.id',
        'column.key',
        'column.name',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
        'column_createUser.nickname',
        'column_createUser.email',
        'column_createUser.profile',
        'column_modifyUser.nickname',
        'column_modifyUser.email',
        'column_modifyUser.profile',
      ])
      .leftJoin('table.column', 'column')
      .leftJoin('column.createUser', 'column_createUser')
      .leftJoin('column.modifyUser', 'column_modifyUser')
      .leftJoin('table.createUser', 'table_createUser')
      .leftJoin('table.modifyUser', 'table_modifyUser')
      .where('table.diagram = :diagramId', { diagramId })
      .orderBy('table.id');
    return await querybuilder.getManyAndCount();
  }
}
