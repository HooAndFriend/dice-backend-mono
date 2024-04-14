// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Epic from '../domain/epic.entity';
import RequestEpicFindDto from '../dto/epic/epic.find.dto';

@CustomRepository(Epic)
export default class EpicRepository extends Repository<Epic> {
  public async findAllByWorkspaceId(
    workspaceId: number,
    dto: RequestEpicFindDto,
  ) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.id',
        'epic.name',
        'epic.code',
        'epic.orderId',
        'epic.dueDate',
        'ticket.id',
        'ticket.name',
        'ticket.status',
        'ticket.code',
        'ticket.orderId',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.createdDate',
        'worker.id',
        'worker.nickname',
        'worker.profile',
        'ticketSetting.id',
        'ticketSetting.color',
        'ticketSetting.type',
      ])
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .where('epic.workspace = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false')
      .orderBy('epic.orderId', 'ASC')
      .addOrderBy('ticket.orderId', 'ASC');

    if (dto.name) {
      querybuilder.andWhere('epic.name like :name', {
        name: `%${dto.name}%`,
      });
    }

    return await querybuilder.getManyAndCount();
  }

  public async findOneEpicById(epicId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select([
        'epic.id',
        'epic.name',
        'epic.code',
        'epic.dueDate',
        'ticket.id',
        'ticket.code',
        'ticket.name',
        'ticket.status',
        'admin.id',
        'admin.profile',
        'admin.nickname',
      ])
      .leftJoin('epic.ticket', 'ticket')
      .leftJoin('epic.admin', 'admin')
      .where('epic.id = :epicId', { epicId })
      .andWhere('epic.isDeleted = false')
      .andWhere('ticket.isDeleted = false')
      .orderBy('ticket.orderId', 'ASC');

    return await querybuilder.getOne();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('epic')
      .select(['workspace.id', 'epic.id', 'epic.name', 'epic.code'])
      .leftJoin('epic.workspace', 'workspace')
      .leftJoin('epic.ticket', 'ticket')
      .where('epic.name = :name', { name })
      .andWhere('workspace.id = :workspaceId', { workspaceId })
      .andWhere('epic.isDeleted = false');

    return await querybuilder.getOne();
  }
}
