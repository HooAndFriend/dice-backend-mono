// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import WorkspaceUser from '../domain/workspace-user.entity';

@CustomRepository(WorkspaceUser)
export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {
  public async findWorkspaceList(userId: number) {
    console.log(userId);
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.profile',
        'workspace.isPersonal',
        'workspaceUser.role',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .where('workspaceUser.userId = :userId', {
        userId,
      });

    return await queryBuilder.getManyAndCount();
  }
}
