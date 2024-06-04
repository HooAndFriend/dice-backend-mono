// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Ticket from '../domain/ticket.entity';
import RequestWorkspaceTaskFindDto from '../../workspace/dto/workspace-task.find.dto';
import dayjs from 'dayjs';

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
        'epic.id',
        'epic.name',
        'admin.userId',
        'admin.email',
        'admin.nickname',
        'admin.profile',
        'worker.userId',
        'worker.email',
        'worker.nickname',
        'worker.profile',
        'ticketFile.id',
        'ticketFile.url',
        'ticketSetting.id',
        'ticketSetting.name',
        'ticketSetting.type',
      ])
      .leftJoin('ticket.ticketFile', 'ticketFile')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.epic', 'epic')
      .leftJoin('ticket.admin', 'admin')
      .leftJoin('ticket.worker', 'worker')
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
        'ticketSetting.id',
        'ticketSetting.name',
        'ticketSetting.type',
        'subTickets.id',
        'subTickets.name',
        'subTickets.status',
        'subTickets.code',
        'subTickets.dueDate',
        'subTickets.completeDate',
        'subTickets.reopenDate',
        'subTickets.orderId',
      ])
      .leftJoin('ticket.workspace', 'workspace')
      .leftJoin('ticket.ticketSetting', 'ticketSetting')
      .leftJoin('ticket.worker', 'worker')
      .leftJoin('ticket.subTickets', 'subTickets') // 하위 티켓 조인
      .where('ticket.workspaceId = :workspaceId', { workspaceId })
      .andWhere('ticket.isDeleted = false')
      .andWhere('ticket.parentTicket IS NULL') // 상위 티켓만 조회
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
