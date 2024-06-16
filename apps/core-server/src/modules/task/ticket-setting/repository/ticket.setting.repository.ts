// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '@/src/global/repository/typeorm-ex.decorator';

// ** Dto Imports
import TicketSetting from '../domain/ticket.setting.entity';

@CustomRepository(TicketSetting)
export default class TicketSettingRepository extends Repository<TicketSetting> {
  public async findSettingByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.ticketSettingId',
        'setting.name',
        'setting.type',
        'setting.description',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .where('setting.workspace = :workspaceId', { workspaceId });
    return await querybuilder.getManyAndCount();
  }

  public async findOneByTypeAndWorkspaceId(type: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.ticketSettingId',
        'setting.name',
        'setting.type',
        'setting.description',
        'workspace.workspaceId',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .where('setting.workspace = :workspaceId', { workspaceId })
      .andWhere('setting.type = :type', { type });

    return querybuilder.getOne();
  }

  public async findSettingById(settingId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.ticketSettingId',
        'setting.color',
        'setting.textColor',
        'setting.type',
        'setting.description',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .where('setting.ticketSettingId = :settingId', { settingId });

    return await querybuilder.getOne();
  }
}
