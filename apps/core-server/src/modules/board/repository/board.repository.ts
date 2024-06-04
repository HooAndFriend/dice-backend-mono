// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Board from '../domain/board.entity';

@CustomRepository(Board)
export default class BoardRepository extends Repository<Board> {
  public async findBoardList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('board')
      .select([
        'board.boardId',
        'board.title',
        'board.createdDate',
        'children.id',
        'children.title',
        'children.createdDate',
      ])
      .leftJoin('board.children', 'children')
      .where('children.isDeleted = false')
      .where('board.parentId is null')
      .andWhere('board.workspaceId = :workspaceId', { workspaceId })
      .andWhere('board.isDeleted = false')

      .orderBy('board.orderId', 'ASC');

    return await queryBuilder.getManyAndCount();
  }
}
