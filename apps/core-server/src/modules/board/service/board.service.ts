// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';

// ** enum, dto, entity, types Imports
import Workspace from '../../workspace/domain/workspace.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';
import Board from '../domain/board.entity';
import RequestBoardUpdateDto, {
  BoardContentInterface,
} from '../dto/board.update.dto';
import BoardContentRepository from '../repository/content.repository';
import BoardBlockRepository from '../repository/block.repository';
import BoardContent from '../domain/board-content.entity';
import { Transactional } from 'typeorm-transactional';
import { BadRequestException } from '@hi-dice/common';
import BoardTypeEnum from '../enum/board.type.enum';
import Optional from 'node-optional';

@Injectable()
export default class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardContentRepository: BoardContentRepository,
    private readonly boardBlockRepository: BoardBlockRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 게시글을 저장합니다.
   */
  public async saveBoard(
    title: string,
    createdId: string,
    workspace: Workspace,
    type: BoardTypeEnum,
    subId?: number,
  ): Promise<Board> {
    const orderId = await this.getOrderId(workspace.workspaceId);

    return await this.boardRepository.save(
      this.boardRepository.create({
        title,
        createdId,
        modifiedId: createdId,
        workspace,
        orderId: type === BoardTypeEnum.NORMAL ? orderId : 0,
        type,
        subId,
      }),
    );
  }

  /**
   * 게시글을 조회합니다. - subId와 type으로 조회
   */
  public async findOneBySubIdAndType(
    subId: number,
    type: BoardTypeEnum,
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { subId, type, isDeleted: false },
      relations: ['children', 'parent', 'content', 'content.blocks'],
    });

    return Optional.of(board).orElseThrow(NotFoundException, 'Not Found Board');
  }

  /**
   * 게시글을 수정합니다.
   */
  @Transactional()
  public async updateBoard(
    dto: RequestBoardUpdateDto,
    modifiedId: string,
  ): Promise<void> {
    await this.saveBoardContent(dto.boardId, dto.content);

    await this.boardRepository.update(dto.boardId, {
      title: dto.title,
      modifiedId,
    });
  }

  /**
   * 게시글 내용을 저장합니다.
   */
  private async saveBoardContent(
    boardId: number,
    content: BoardContentInterface,
  ): Promise<void> {
    // 기존 게시글 내용 삭제
    await this.boardContentRepository.delete({ board: { boardId } });

    const savedContent = await this.boardContentRepository.save(
      this.boardContentRepository.create({
        board: { boardId },
        time: content.time,
        version: content.version,
      }),
    );

    await this.saveBlock(savedContent, content.blocks);
  }

  /**
   * 게시글 블록을 저장합니다.
   */
  public async saveBlock(content: BoardContent, blocks: any[]): Promise<void> {
    blocks.map((block) => {
      this.boardBlockRepository.save(
        this.boardBlockRepository.create({
          blockId: block.id,
          type: block.type,
          data: JSON.stringify(block.data),
          content: content,
        }),
      );
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
      relations: ['children', 'parent', 'content', 'content.blocks'],
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
