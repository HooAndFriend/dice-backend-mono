// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

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
        'children.boardId',
        'children.title',
        'children.createdDate',
      ])
      .leftJoin('board.parent', 'parent')
      .leftJoin('board.children', 'children')
      .leftJoin('board.workspace', 'workspace')
      .where('parent.boardId is null')
      .andWhere('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('board.isDeleted = false')
      .orderBy('board.orderId', 'ASC');

    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where('children.boardId IS NULL').orWhere(
          'children.isDeleted = false',
        );
      }),
    );

    return await queryBuilder.getManyAndCount();
  }
  public async findBoardSimpleList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('board')
      .select([
        'board.boardId',
        'board.title',
        'board.content',
        'board.modifiedDate',
      ])
      .leftJoin('board.workspace', 'workspace')
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('board.isDeleted = false')
      .orderBy('board.modifiedDate', 'DESC')
      .limit(5);

    return await queryBuilder.getManyAndCount();
  }
}
