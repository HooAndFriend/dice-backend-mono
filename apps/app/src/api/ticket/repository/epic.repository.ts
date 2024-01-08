// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import Epic from '../domain/epic.entity';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {
  public async findAllEpicByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.id',
        'epic.name',
        'epic.code',
        'workspace.id',
        'workspace.name',
        'admin.id',
        'admin.nickname',
        'admin.profile',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.admin', 'admin')
      .where('epic.workspace = :workspaceId', { workspaceId });
    return await querybuilder.getManyAndCount();
  }
}
