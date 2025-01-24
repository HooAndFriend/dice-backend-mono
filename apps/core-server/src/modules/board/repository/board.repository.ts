// ** Typeorm Imports
import { Brackets, Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';

// ** Dto Imports
import Board from '../domain/board.entity';
import BoardTypeEnum from '../enum/board.type.enum';

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
      .andWhere('board.type = :type', { type: BoardTypeEnum.NORMAL })
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
    const subQuery = this.createQueryBuilder('board')
      .select([
        'board.boardId AS boardId',
        'board.title AS title',
        'board.modifiedDate AS modifiedDate',
      ])
      .leftJoin('board.workspace', 'workspace')
      .where('workspace.workspaceId = :workspaceId', { workspaceId })
      .andWhere('board.type = :type', { type: BoardTypeEnum.NORMAL })
      .andWhere('board.isDeleted = false')
      .orderBy('board.modifiedDate', 'DESC')
      .limit(5)
      .getQuery();

    const queryBuilder = this.createQueryBuilder('board')
      .select([
        'board.boardId',
        'board.title',
        'content.contentId',
        'content.time',
        'content.version',
        'blocks.blockId',
        'blocks.type',
        'blocks.data',
        'board.modifiedDate',
      ])
      .innerJoin(
        `(${subQuery})`,
        'limited_boards',
        'limited_boards.boardId = board.boardId',
      )
      .leftJoin('board.content', 'content')
      .leftJoin('content.blocks', 'blocks')
      .orderBy('board.modifiedDate', 'DESC')
      .setParameters({ workspaceId, type: BoardTypeEnum.NORMAL });

    return await queryBuilder.getManyAndCount();
  }
}
