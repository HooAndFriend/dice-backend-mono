// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Module Imports
import BoardRepository from '../repository/board.repository';
import BoardMentionRepository from '../repository/mention.repository';
import BoardContentRepository from '../repository/content.repository';
import BoardBlockRepository from '../repository/block.repository';
import WorkspaceUserService from '../../workspace/service/workspace-user.service';

// ** enum, dto, entity, types Imports
import Workspace from '../../workspace/domain/workspace.entity';
import { NotFoundException } from '@/src/global/exception/CustomException';
import Board from '../domain/board.entity';
import RequestBoardUpdateDto, {
  BoardContentInterface,
  MentionInterface,
} from '../dto/board.update.dto';
import BoardContent from '../domain/board-content.entity';
import User from '../../user/domain/user.entity';
import BoardBlock from '../domain/board-block.entity';
import { Transactional } from 'typeorm-transactional';
import BoardTypeEnum from '../enum/board.type.enum';
import Optional from 'node-optional';

@Injectable()
export default class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardContentRepository: BoardContentRepository,
    private readonly boardBlockRepository: BoardBlockRepository,
    private readonly boardMentionRepository: BoardMentionRepository,
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
    modifiedUser: User,
  ): Promise<void> {
    await this.saveBoardContent(
      dto.boardId,
      dto.content,
      dto.mentions,
      modifiedUser,
    );

    await this.boardRepository.update(dto.boardId, {
      title: dto.title,
      modifiedId: modifiedUser.email,
    });
  }

  /**
   * 게시글 내용을 저장합니다.
   */
  private async saveBoardContent(
    boardId: number,
    content: BoardContentInterface,
    mentions: MentionInterface[],
    modifiedUser: User,
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

    await this.saveBlock(savedContent, content.blocks, mentions, modifiedUser);
  }

  public async saveBlock(
    content: BoardContent,
    blocks: any[],
    mentions: MentionInterface[],
    mentioner: User,
  ): Promise<void> {
    const savePromises = blocks.map(async (block) => {
      const blockData = JSON.stringify(block.data);
      const savedBlock = await this.boardBlockRepository.save(
        this.boardBlockRepository.create({
          type: block.type,
          data: blockData,
          content,
        }),
      );

      const relatedMentions = mentions.filter((m) => m.blockId === block.id);
      await this.saveMentions(relatedMentions, savedBlock, mentioner);
    });

    await Promise.all(savePromises);
  }

  /**
   * 멘션 정보를 저장합니다
   */
  public async saveMentions(
    mentions: MentionInterface[],
    block: BoardBlock,
    mentioner: User,
  ): Promise<void> {
    const savePromises = mentions.map(async (mention) => {
      await this.boardMentionRepository.save(
        this.boardMentionRepository.create({
          block: block,
          mentionKey: mention.mentionKey,
          mentioner: mentioner,
          mentionedUser: { userId: mention.userId } as User,
        }),
      );
    });

    await Promise.all(savePromises);
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
    const board = await this.boardRepository.findBoardById(boardId);

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
