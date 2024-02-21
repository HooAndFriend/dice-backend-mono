// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
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

  public async findEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['epic.id', 'epic.name', 'epic.code', 'workspace.id', 'admin.id'])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.admin', 'admin')
      .where('epic.id = :epicId', { epicId });
    return await querybuilder.getOne();
  }

  public async findAllByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'workspace.id',
        'epic.id',
        'epic.name',
        'epic.code',
        'ticket.id',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.workspace = :workspaceId', { workspaceId });
    return await querybuilder.getManyAndCount();
  }

  public async findOneEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'workspace.id',
        'epic.id',
        'epic.name',
        'epic.code',
        'ticket.id',
        'ticket.name',
        'ticket.dueDate',
        'ticket.endDate',
        'ticket.reopenDate',
        'ticket.status',
        'worker.id',
        'worker.profile',
        'worker.nickname',
      ])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('epic.worker', 'worker')
      .where('epic.id = :epicId', { epicId });
    return await querybuilder.getManyAndCount();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['workspace.id', 'epic.id', 'epic.name', 'epic.code'])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.name = :name', { name })
      .andWhere('workspace.id = :workspaceId', { workspaceId });

    return await querybuilder.getOne();
  }
}
