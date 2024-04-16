// ** Nest Imports

import { Injectable } from '@nestjs/common';

// ** Utils Imports
import admin from 'firebase-admin';

// ** enum, dto, entity, types Imports
import { BadRequestException } from '@/src/global/exception/CustomException';
import * as serviceAccount from '@/src/firebase-config.json';

@Injectable()
export default class WebPushService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  /**
   * Send push message
   * @param token
   * @param title
   * @param body
   */
  public async sendPushMessage(token: string, title: string, body: string) {
    //메시지 객체 생성
    const message = {
      notification: {
        title: title,
        body: body,
      },
      // 클라이언트 토큰
      token: token,
    };

    try {
      // push 메시지 전송
      await admin.messaging().send(message);
    } catch (error) {
      throw new BadRequestException('Failed to send message');
    }
  }

  public async sendPushMessageToMultiple(
    tokens: string[],
    title: string,
    body: string,
  ) {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      // 클라이언트 토큰 배열
      tokens: tokens,
    };

    try {
      await admin.messaging().sendEachForMulticast(message);
    } catch (error) {
      throw new BadRequestException('Failed to send message');
    }
  }
}
