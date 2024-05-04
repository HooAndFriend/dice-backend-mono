// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';
import RequestWorkspaceFindDto from '../dto/workspace.find.dto';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  /**
   * 팀의 워크스페이스 리스트 조회
   * @param teamId
   * @returns Workspace[]
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

  /**
   * Find Workspace List
   * @param dto
   * @returns Workspace[]
   */
  public async findWorkspaceList(dto: RequestWorkspaceFindDto) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.comment',
        'workspace.createdId',
        'workspace.createdDate',
        'workspaceUser.id',
      ])
      .leftJoin('workspace.workspaceUser', 'workspaceUser');

    if (dto.name) {
      queryBuilder.where('workspace.name like :name', {
        name: `%${dto.name}%`,
      });
    }

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    if (dto.createdId) {
      queryBuilder.andWhere('workspace.createdId like :createdId', {
        createdId: `%${dto.createdId}%`,
      });
    }

    if (dto.comment) {
      queryBuilder.andWhere('workspace.comment like :comment', {
        comment: `%${dto.comment}%`,
      });
    }

    if (dto.createdStartDate && dto.createdEndDate) {
      queryBuilder.andWhere(
        'workspace.createdDate between :createdStartDate and :createdEndDate',
        {
          createdStartDate: dto.createdStartDate,
          createdEndDate: dto.createdEndDate,
        },
      );
    }

    return await queryBuilder.getManyAndCount();
  }

  public async findWorkspaceById(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.id',
        'workspace.name',
        'workspace.comment',
        'workspace.profile',
        'workspace.createdId',
        'workspace.createdDate',
        'workspaceUser.id',
      ])
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }
}
