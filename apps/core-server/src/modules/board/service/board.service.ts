// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';

// ** enum, dto, entity, types Imports
import Workspace from '../../workspace/domain/workspace.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';
import Board from '../domain/board.entity';
import RequestBoardUpdateDto from '../dto/board.update.dto';

@Injectable()
export default class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 게시글을 저장합니다.
   */
  public async saveBoard(
    title: string,
    createdId: string,
    workspace: Workspace,
  ): Promise<Board> {
    const orderId = await this.getOrderId(workspace.workspaceId);

    return await this.boardRepository.save(
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
   * 게시글을 수정합니다.
   */
  public async updateBoard(
    dto: RequestBoardUpdateDto,
    modifiedId: string,
  ): Promise<void> {
    await this.boardRepository.update(dto.boardId, {
      title: dto.title,
      content: dto.content,
      modifiedId,
    });
  }

  /**
   * 게시글 제목을 수정합니다.
   */
  public async updateBoardTitle(
    boardId: number,
    title: string,
    modifiedId: string,
  ): Promise<void> {
    await this.boardRepository.update(boardId, { title, modifiedId });
  }

  /**
   * 상위 객체가 있는 게시글을 생성합니다.
   */
  public async saveBoardWithParent(
    title: string,
    createdId: string,
    workspace: Workspace,
    board: Board,
  ): Promise<Board> {
    const orderId = await this.getOrderId(workspace.workspaceId);

    return await this.boardRepository.save(
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
   * 게시글을 조회합니다.
   */
  public async findBoardById(boardId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { boardId, isDeleted: false },
      relations: ['children', 'parent'],
    });

    if (!board) {
      throw new NotFoundException('Not Found Board');
    }

    return board;
  }

  /**
   * 게시글이 존재하는지 확인합니다.
   */
  public async existedBoardById(boardId: number): Promise<void> {
    const board = await this.boardRepository.exist({
      where: { boardId, isDeleted: false },
    });

    if (!board) {
      throw new NotFoundException('Not Found Board');
    }
  }

  /**
   * 게시글을 삭제합니다.
   */
  public async deleteBoard(boardId: number): Promise<void> {
    await this.boardRepository.update(boardId, { isDeleted: true });
  }

  /**
   * 워크스페이스에 속한 게시글 리스트를 조회합니다.
   */
  public async findBoardListByWorkspaceId(
    workspaceId: number,
  ): Promise<[Board[], Number]> {
    return await this.boardRepository.findBoardList(workspaceId);
  }

  /**
   * 최근 수정된 5개의 게시글 리스트를 조회합니다.
   */
  public async findBoardSimpleList(
    workspaceId: number,
  ): Promise<[Board[], number]> {
    return await this.boardRepository.findBoardSimpleList(workspaceId);
  }

  // ******* Private Method
  // *******

  /**
   * 게시글의 orderId를 조회합니다.
   */
  private async getOrderId(workspaceId: number): Promise<number> {
    return await this.boardRepository.count({
      where: { workspace: { workspaceId } },
    });
  }
}
