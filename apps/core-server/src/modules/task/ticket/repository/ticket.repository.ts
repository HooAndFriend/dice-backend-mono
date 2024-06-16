// ** Typeorm Imports
import { Repository } from 'typeorm';

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
      .leftJoin('ticket.ticketFile', 'ticketFile')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.subTickets', 'subTickets')
      .leftJoin('subTickets.ticketSetting', 'subTicketSetting')
      .leftJoin('subTickets.worker', 'subTicketWorker')

      .where('ticket.ticketId = :ticketId', { ticketId })
      .andWhere('ticket.isDeleted = false');

    return await querybuilder.getOne();
  }

  public async findTicketListByDate(
    workspaceId: number,
    userId: number,
    dto: RequestWorkspaceTaskFindDto,
  ) {
    const startDate = dayjs(dto.date)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');

    const endDate = dayjs(dto.date)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');

    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.dueDate',
        'ticket.createdDate',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.worker', 'worker')
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('worker.id = :userId', { userId })
      .andWhere('ticket.dueDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    return await querybuilder.getMany();
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
        'subTicketWorker.userId', // Assuming sub-ticket worker exists
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

  public async findMyTeamTicketList(teamId: number, month: string) {
    const [year, monthStr] = month.split('-');
    const startDate = new Date(parseInt(year), parseInt(monthStr) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(monthStr), 0);

    const querybuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.name',
        'ticket.status',
        'ticket.dueDate',
        'ticket.code',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .where('ticket.dueDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('ticket.isDeleted = false');
    return await querybuilder.getManyAndCount();
  }

  public async findTicketListByWorkerId(workerId: number) {
    const queryBuilder = this.createQueryBuilder('ticket')
      .select([
        'ticket.ticketId',
        'ticket.code',
        'ticket.status',
        'ticket.name',
        'ticket.createdDate',
      ])
      .leftJoin('ticket.worker', 'worker')
      .where('worker.userId = :workerId', { workerId })
      .andWhere('ticket.dueDate = :today', {
        today: dayjs().format('YYYY-MM-DD'),
      })
      .andWhere('ticket.isDeleted = false');

    return await queryBuilder.getMany();
  }
}
