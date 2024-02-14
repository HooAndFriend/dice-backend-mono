// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  /**
   * 팀의 워크스페이스 리스트 조회
   * @param teamId
   * @returns Workspace
   */
  public async findWorkspaceListByTeamId(teamId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.createdId',
        'workspace.createdDate',
      ])
      .where('workspace.teamId = :teamId', { teamId });

    return await queryBuilder.getManyAndCount();
  }
}
