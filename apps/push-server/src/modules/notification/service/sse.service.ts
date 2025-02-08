// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { finalize, Subject } from 'rxjs';

// ** Custom Module Imports

// ** enum, dto, entity, types Imports

@Injectable()
export default class SSEService {
  constructor() {}
  private userConnections = new Map<string, Subject<{ data: string }>>();

  // 사용자 연결 추가
  public addConnection(userId: string) {
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
  public removeConnection(userId: string) {
    this.userConnections.delete(userId);
  }

  // 사용자에게 메시지 전송
  public sendMessage(userIds: Array<string>, data: string) {
    userIds.forEach((userId) => {
      const userConnection = this.userConnections.get(userId);
      if (userConnection) {
        userConnection.next({ data });
      }
    });
  }
}
