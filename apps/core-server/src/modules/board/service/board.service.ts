// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';

// ** enum, dto, entity, types Imports
import Workspace from '../../workspace/domain/workspace.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';
import Board from '../domain/board.entity';

@Injectable()
export default class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Save Board
   * @param title
   * @param createdId
   */
  public async saveBoard(
    title: string,
    createdId: string,
    workspace: Workspace,
  ) {
    await this.boardRepository.save(
      this.boardRepository.create({
        title,
        createdId,
        modifiedId: createdId,
        workspace,
      }),
    );
  }

  /**
   * Save Board With Parent
   * @param title
   * @param createdId
   * @param workspace
   * @param board
   */
  public async saveBoardWithParent(
    title: string,
    createdId: string,
    workspace: Workspace,
    board: Board,
  ) {
    await this.boardRepository.save(
      this.boardRepository.create({
        title,
        createdId,
        modifiedId: createdId,
        workspace,
        parent: board,
      }),
    );
  }

  /**
   * Find Board By Id
   * @param boardId
   * @returns
   */
  public async findBoardById(boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException('Not Found Board');
    }

    return board;
  }
}
