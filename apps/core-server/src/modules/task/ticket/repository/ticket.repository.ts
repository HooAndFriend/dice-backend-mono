// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

// ** Utils Imports
import dayjs from 'dayjs';
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Ticket from '../domain/ticket.entity';
import RequestWorkspaceTaskFindDto from '@/src/modules/workspace/dto/workspace-task.find.dto';

@CustomRepository(Ticket)
export default class TicketRepository extends Repository<Ticket> {
  public async findTicketDetailById(ticketId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
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
        'parentLink.ticketLinkId',
        'parentLink.parentTicketId',
        'parentLink.childTicketId',
        'parentTicket.ticketId',
        'parentTicket.name',
        'parentTicket.status',
        'parentTicket.code',
        'parentTicket.dueDate',
        'parentTicket.completeDate',
        'parentTicket.reopenDate',
        'parentTicket.orderId',
        'parentTicketWorker.userId',
        'parentTicketWorker.email',
        'parentTicketWorker.nickname',
        'parentTicketWorker.profile',
        'parentTicketSetting.ticketSettingId',
        'parentTicketSetting.name',
        'parentTicketSetting.type',
        'childLink.ticketLinkId',
        'childLink.parentTicketId',
        'childLink.childTicketId',
        'childTicket.ticketId',
        'childTicket.name',
        'childTicket.status',
        'childTicket.code',
        'childTicket.dueDate',
        'childTicket.completeDate',
        'childTicket.reopenDate',
        'childTicket.orderId',
        'childTicketWorker.userId',
        'childTicketWorker.email',
        'childTicketWorker.nickname',
        'childTicketWorker.profile',
        'childTicketSetting.ticketSettingId',
        'childTicketSetting.name',
        'childTicketSetting.type',
      ])
      .leftJoin('ticket.ticketFile', 'ticketFile')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.parentLink', 'parentLink')
      .leftJoin('parentLink.parentTicket', 'parentTicket')
      .leftJoin('parentTicket.ticketSetting', 'parentTicketSetting')
      .leftJoin('parentTicket.worker', 'parentTicketWorker')
      .leftJoin('ticket.childLink', 'childLink')
      .leftJoin('childLink.childTicket', 'childTicket')
      .leftJoin('childTicket.ticketSetting', 'childTicketSetting')
      .leftJoin('childTicket.worker', 'childTicketWorker')

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
      .andWhere('ticket.dueDate = CURRENT_DATE()')
      .andWhere(
        new Brackets((qb) => {
          qb.andWhere('worker.userId = :userId', {
            userId,
          }).orWhere('admin.userId = :userId', { userId });
        }),
      )
      .orderBy('ticket.orderId', 'ASC');

    return await querybuilder.getManyAndCount();
  }

  public async findAllTicketByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
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
        'subTickets.ticketId',
        'subTickets.name',
        'subTickets.status',
        'subTickets.code',
        'subTickets.dueDate',
        'subTickets.completeDate',
        'subTickets.reopenDate',
        'subTickets.orderId',
        'subTicketWorker.userId',
        'subTicketWorker.email',
        'subTicketWorker.nickname',
        'subTicketWorker.profile',
        'subTicketSetting.ticketSettingId',
        'subTicketSetting.name',
        'subTicketSetting.type',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.subTickets', 'subTickets')
      .leftJoin('subTickets.ticketSetting', 'subTicketSetting') // Joining subTicketSetting
      .leftJoin('subTickets.worker', 'subTicketWorker') // Joining subTicketWorker
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.isDeleted = false')
      .andWhere('ticket.parentTicket IS NULL')
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
}
