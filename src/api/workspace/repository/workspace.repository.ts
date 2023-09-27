// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from 'src/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  public async findWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.isPersonal',
        'workspaceUser.role',
        'user.nickname',
        'user.email',
        'user.profile',
      ])
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .leftJoin('workspaceUser.user', 'user')
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }

  public async findMainWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.isPersonal',
      ])
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }
}
