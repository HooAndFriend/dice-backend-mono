// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import WorkspaceUser from '../domain/workspace-user.entity';

@CustomRepository(WorkspaceUser)
export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {
  /**
   * 유저의 워크스페이스 리스트 조회
   * @param userId
   * @returns
   */
  public async findWorkspaceUserList(userId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.createdDate',
        'workspaceUser.role',
        'workspace.name',
      ])
      .leftJoin('workspaceUser.workspace', 'workspace')
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .where('teamUser.userId = :userId', { userId });

    return await queryBuilder.getManyAndCount();
  }
}
