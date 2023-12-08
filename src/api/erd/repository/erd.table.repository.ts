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
      .select([
        'table.id',
        'table.physical_name',
        'table.logical_name',
        'table.comment',
      ])
      .where('table.workspace = :workspaceId', { workspaceId })
      .andWhere('table.name = :name', { name });
    return await querybuilder.getOne();
  }

  public async findTableById(id: number) {
    const querybuilder = this.createQueryBuilder('table')
      .select([
        'table.id',
        'table.physical_name',
        'table.logical_name',
        'table.comment',
        'diagram.id',
      ])
      .leftJoin('table.diagram', 'diagram')
      .where('table.id = :id', { id });
    return await querybuilder.getOne();
  }

  public async findErd(diagramId: number) {
    const querybuilder = this.createQueryBuilder('table')
      .select([
        'table.id',
        'table.physicalName',
        'table.logicalName',
        'table.comment',
        'column.id',
        'column.key',
        'column.physicalName',
        'column.logicalName',
        'column.comment',
        'column.dataType',
        'column.isNull',
        'column.option',
        'chlid.id',
        'parent.id',
        'mapping.type',
      ])
      .leftJoin('table.column', 'column')
      .leftJoin('column.mapping', 'mapping')
      .leftJoin('mapping.tableChild', 'chlid')
      .leftJoin('mapping.tableParent', 'parent')
      .where('table.diagram = :diagramId', { diagramId });
    return await querybuilder.getManyAndCount();
  }
}
