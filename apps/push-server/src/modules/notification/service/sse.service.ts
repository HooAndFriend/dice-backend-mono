// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { finalize, Observable, Subject } from 'rxjs';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports
import { SendMentionDto } from '../dto/mention-send.dto';

@Injectable()
export default class SSEService {
  constructor() {}
  private userConnections = new Map<string, Subject<{ data: string }>>();

  // 사용자 연결 추가
  public addConnection(userId: string): Observable<{ data: string }> {
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Subject<{ data: string }>());
    }
    return this.userConnections
      .get(userId)
      .asObservable()
      .pipe(
        finalize(() => {
          this.removeConnection(userId);
        }),
      );
  }

  // 사용자 연결 제거
  public removeConnection(userId: string): void {
    this.userConnections.delete(userId);
  }

  // 사용자에게 메시지 전송
  public sendMessage(dto: SendMentionDto): void {
    const message = `${dto.mentioner}님이 회원님을 언급했습니다.`;

    dto.mentioned_userIds.forEach((userId) => {
      const userConnection = this.userConnections.get(userId);
      if (userConnection) {
        userConnection.next({ data: message });
      }
    });
  }
}
