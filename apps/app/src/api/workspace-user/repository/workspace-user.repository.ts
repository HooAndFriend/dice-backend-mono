// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import WorkspaceUser from '../domain/workspace-user.entity';

@CustomRepository(WorkspaceUser)
export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {
  public async findWorkspaceList(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.isPersonal',
        'workspaceUser.role',
        'workspaceUser.id',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .orderBy('workspace.isPersonal', 'DESC')
      .where('workspaceUser.userId = :userId', {
        userId,
      });

    return await queryBuilder.getManyAndCount();
  }
}