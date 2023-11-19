// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Table from '../domain/table.entity';

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
}
