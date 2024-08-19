// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';
import RequestWorkspaceFindDto from '../dto/workspace.find.dto';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {
  public async findWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.workspaceId',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspaceUser.workspaceUserId',
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

  public async findPersonalWorkspaceList(email: string) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.workspaceId',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.isPersonal',
        'workspace.uuid',
      ])

      .where('workspace.createdId = :email', { email })
      .andWhere('workspace.isPersonal = true');

    return await queryBuilder.getMany();
  }

  public async findMainWorkspace(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.workspaceId',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
      ])
      .where('workspace.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }

  public async findTeamWorkspaceListWithCount(teamId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.workspaceId',
        'workspace.name',
        'workspace.profile',
        'workspace.comment',
        'workspace.uuid',
      ])
      .addSelect('COUNT(workspaceUser.id)', 'workspaceUserCount')
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.teamId = :teamId', { teamId })
      .groupBy('workspace.id');

    return await queryBuilder.getRawMany();
  }

  /**
   * Find Workspace Team Id
   * @param workspceId
   * @returns
   */
  public async findWorkspaceTeamId(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select(['workspace.workspaceId', 'team.id'])
      .leftJoin('workspace.team', 'team')
      .where('workspace.id = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }

  /**
   * Find Workspace Count And Member Count
   * @param teamId
   * @returns
   */
  public async findWorkspaceCountAndMemberCount(teamId: number) {
    const workspaceCount = await this.createQueryBuilder('workspace')
      .where('workspace.teamId = :teamId', { teamId })
      .getCount();

    const workspaceUserCount = await this.createQueryBuilder('workspace')
      .innerJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.teamId = :teamId', { teamId })
      .getCount();

    return { workspaceCount, workspaceUserCount };
  }

  /**
   * 워크스페이스 리스트 조회
   */
  public async findWorkspaceList(dto: RequestWorkspaceFindDto) {
    const queryBuilder = this.createQueryBuilder('workspace')
      .select([
        'workspace.workspaceId',
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
        'workspace.workspaceId',
        'workspace.name',
        'workspace.comment',
        'workspace.profile',
        'workspace.createdId',
        'workspace.createdDate',
        'workspaceUser.workspaceUserId',
      ])
      .leftJoin('workspace.workspaceUser', 'workspaceUser')
      .where('workspace.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getOne();
  }
}
