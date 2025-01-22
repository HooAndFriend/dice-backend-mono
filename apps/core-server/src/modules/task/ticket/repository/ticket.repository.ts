// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

// ** Utils Imports
import dayjs from 'dayjs';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Ticket from '../domain/ticket.entity';
import RequestWorkspaceTaskFindDto from '@/src/modules/workspace/dto/workspace-task.find.dto';
import RequestTicketFindDto from '../dto/ticket/ticket.find.dto';

@CustomRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {
  public async findTicketDetailById(ticketId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.priority',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.code',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.createdDate',
        'ticket.modifiedDate',
        'admin.userId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketFile.ticketFileId',
        'ticketFile.url',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
        'epic.epicId',
        'epic.name',
        'epic.code',
        'epicSetting.ticketSettingId',
        'epicSetting.name',
        'epicSetting.type',
      ])
      .leftJoin('ticket.ticketFile', 'ticketFile')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.epic', 'epic')
      .leftJoin('epic.ticketSetting', 'epicSetting')
      .where('ticket.ticketId = :ticketId', { ticketId })
      .andWhere('ticket.isDeleted = false');

    return await querybuilder.getOne();
  }

  public async findMyTicketList(workspaceId: number, userId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.priority',
        'ticket.code',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.orderId',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'admin.userId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.admin', 'admin')
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.isDeleted = false')
      .andWhere(
        new Brackets((qb) => {
          qb.andWhere('worker.userId = :userId', {
            userId,
          }).orWhere('admin.userId = :userId', { userId });
        }),
      )
      .orderBy('ticket.dueDate', 'DESC');

    return await querybuilder.getManyAndCount();
  }

  public async findAllTicketByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.priority',
        'ticket.status',
        'ticket.code',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'ticket.orderId',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketSetting.ticketSettingId',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.isDeleted = false')
      .orderBy('ticket.orderId', 'ASC');

    return await querybuilder.getManyAndCount();
  }

  public async findOneByNameAndWorkspaceId(name: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.dueDate',
        'ticket.code',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.workspaceId',
        'worker.userId',
        'worker.nickname',
        'worker.profile',
        'admin.userId',
        'admin.nickname',
        'admin.profile',
        'epic.id',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.epic', 'epic')
      .where('ticket.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.name = :name', { name })
      .andWhere('ticket.isDeleted = false');

    return await querybuilder.getOne();
  }

  public async findTicketByQuery(findQuery: RequestTicketFindDto) {
    const queryBuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.content',
        'ticket.storypoint',
        'ticket.dueDate',
        'ticket.completeDate',
        'ticket.reopenDate',
        'workspace.workspaceId',
        'epic.epicId',
        'admin.userId',
        'admin.nickname',
        'admin.profile',
        'worker.userId',
        'worker.nickname',
        'worker.profile',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.epic', 'epic')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker');
    if (findQuery.content) {
      queryBuilder.andWhere('ticket.content LIKE :content', {
        content: `%${findQuery.content}%`,
      });
    }
    if (findQuery.dueDate) {
      queryBuilder.andWhere('ticket.dueDate >= :dueDate', {
        dueDate: `${findQuery.dueDate}`,
      });
    }
    if (findQuery.completeDate) {
      queryBuilder.andWhere('ticket.completeDate <= :completeDate', {
        completeDate: `${findQuery.completeDate}`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }
}
