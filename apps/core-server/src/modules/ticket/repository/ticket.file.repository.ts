// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import TicketFile from '../domain/ticket.file.entity';

@CustomRepository(TicketFile)
export default class TicketFileRepository extends Repository<TicketFile> {
  public async findAllFileByTicketId(ticketId: number) {
    const querybuilder = this.createQueryBuilder('file')
      .select(['file.id', 'file.url'])
      .leftJoin('file.ticket', 'ticket')
      .leftJoin('ticket.admin', 'admin')
      .where('file.ticket = :ticketId', { ticketId });

    return querybuilder.getManyAndCount();
  }

  public async findAllChangedFileByTicketId(
    ticketId: number,
    file: Array<number>,
  ) {
    const querybuilder = this.createQueryBuilder('file')
      .select(['file.id', 'file.url'])
      .where('file.ticket = :ticketId', { ticketId })
      .andWhere('file.id NOT IN (:file)', { file });

    return querybuilder.getManyAndCount();
  }
}
