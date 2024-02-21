// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import State from '../domain/state.entity';
import RequestPagingDto from '@/src/global/dto/paging.dto';

@CustomRepository(State)
export default class StateRepository extends Repository<State> {
  public async findStateList(dto: RequestPagingDto) {
    const queryBuilder = this.createQueryBuilder('state').select([
      'state.id',
      'state.name',
      'state.color',
      'state.description',
      'state.expose_yn',
    ]);

    if (dto.page && dto.pageSize) {
      queryBuilder.skip(dto.page * dto.pageSize).take(dto.pageSize);
    }

    return await queryBuilder
      .orderBy('state.created_date', 'DESC')
      .getManyAndCount();
  }
}
