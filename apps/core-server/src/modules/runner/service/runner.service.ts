// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import BoardRepository from '../../board/repository/board.repository';
import TicketRepository from '../../task/ticket/repository/ticket.repository';
import TicketCommentRepository from '../../task/ticket-comment/repository/ticket.comment.repository';
import BoardTypeEnum from '../../board/enum/board.type.enum';
import { Transactional } from 'typeorm-transactional';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';

@Injectable()
export default class RunnerService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketCommentRepository: TicketCommentRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  private logger = new Logger(RunnerService.name);

  /**
   * Task의 정렬 순서를 업데이트합니다.
   */
  @Transactional()
  public async runnerTaskOrder(): Promise<void> {
    const workspaceList = await this.workspaceRepository.find({
      relations: ['ticket', 'epic', 'epic.ticket'],
    });

    for await (const workspace of workspaceList) {
      const ticketList = workspace.ticket;
      for (let i = 0; i < ticketList.length; i++) {
        const ticket = ticketList[i];
        ticket.orderId = i;
        await this.ticketRepository.save(ticket);
      }

      for await (const epic of workspace.epic) {
        const ticketList = epic.ticket;
        for (let i = 0; i < ticketList.length; i++) {
          const ticket = ticketList[i];
          ticket.epicOrderId = i;
          await this.ticketRepository.save(ticket);
        }
      }
    }
  }

  /**
   * Ticket과 Comment에 대한 Board를 생성합니다.
   */
  @Transactional()
  public async runnerBoard() {
    const ticketList = await this.ticketRepository.find({
      relations: ['workspace', 'worker'],
    });

    for await (const ticket of ticketList) {
      await this.boardRepository.save(
        this.boardRepository.create({
          title: '',
          workspace: ticket.workspace,
          orderId: 0,
          createdId: '',
          modifiedId: '',
          type: BoardTypeEnum.TICKET_BOARD,
          subId: ticket.ticketId,
        }),
      );
    }

    const commentList = await this.ticketCommentRepository.find({
      relations: ['user', 'ticket', 'ticket.workspace'],
    });

    for await (const comment of commentList) {
      await this.boardRepository.save(
        this.boardRepository.create({
          title: '',
          workspace: comment.ticket.workspace,
          orderId: 0,
          createdId: '',
          modifiedId: '',
          type: BoardTypeEnum.REPLY_BOARD,
          subId: comment.ticketCommentId,
        }),
      );
    }
  }
}
