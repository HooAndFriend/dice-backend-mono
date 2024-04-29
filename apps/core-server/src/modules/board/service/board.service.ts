// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';

// ** enum, dto, entity, types Imports
import Workspace from '../../workspace/domain/workspace.entity';
import { NotFoundException } from '@hi-dice/common';
import Board from '../domain/board.entity';
import RequestBoardUpdateDto from '../dto/board.update.dto';

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
    const orderId = await this.getOrderId(workspace.id);

    await this.boardRepository.save(
      this.boardRepository.create({
        title,
        createdId,
        modifiedId: createdId,
        workspace,
        orderId,
      }),
    );
  }

  /**
   * Update Board
   * @param board
   * @param dto
   * @param modifiedId
   */
  public async updateBoard(dto: RequestBoardUpdateDto, modifiedId: string) {
    await this.boardRepository.update(dto.boardId, {
      title: dto.title,
      content: dto.content,
      modifiedId,
    });
  }

  /**
   * Update Board Title
   * @param boardId
   * @param title
   */
  public async updateBoardTitle(
    boardId: number,
    title: string,
    modifiedId: string,
  ) {
    await this.boardRepository.update(boardId, { title, modifiedId });
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
    const orderId = await this.getOrderId(workspace.id);

    await this.boardRepository.save(
      this.boardRepository.create({
        title,
        createdId,
        modifiedId: createdId,
        workspace,
        isDeleted: false,
        parent: board,
        orderId,
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
      where: { id: boardId, isDeleted: false },
      relations: ['children', 'parent'],
    });

    if (!board) {
      throw new NotFoundException('Not Found Board');
    }

    return board;
  }

  /**
   * Existed Board By Id
   * @param boardId
   */
  public async existedBoardById(boardId: number) {
    const board = await this.boardRepository.exist({
      where: { id: boardId, isDeleted: false },
    });

    if (!board) {
      throw new NotFoundException('Not Found Board');
    }
  }

  /**
   * Delete Board
   * @param boardId
   */
  public async deleteBoard(boardId: number) {
    await this.boardRepository.update(boardId, { isDeleted: true });
  }

  /**
   * Find Board List By Workspace Id
   * @param workspaceId
   * @returns
   */
  public async findBoardListByWorkspaceId(workspaceId: number) {
    return await this.boardRepository.findBoardList(workspaceId);
  }

  // ******* Private Method
  // *******

  /**
   * Get Order Id
   * @param workspaceId
   * @returns
   */
  private async getOrderId(workspaceId: number) {
    return await this.boardRepository.count({
      where: { workspace: { id: workspaceId } },
    });
  }
}
