// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Table from '../domain/erd.table.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@CustomRepository(Table)
export default class TableRepository extends Repository<Table> {
  public async findTable(workspaceId: number) {
    const qb = this.createQueryBuilder('table')
      .select([
        'table.id',
        'table.name',
        'table.comment',
        'create_user.nickname',
        'create_user.email',
        'create_user.profile',
        'modify_user.nickname',
        'modify_user.email',
        'modify_user.profile',
      ])
      .leftJoin('table.create_user', 'create_user')
      .leftJoin('table.modify_user', 'modify_user')
      .where('table.workspace = :workspaceId', { workspaceId });
    return await qb.getManyAndCount();
  }
}
