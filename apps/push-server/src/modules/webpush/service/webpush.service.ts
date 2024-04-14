// ** Nest Imports
import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

// ** Custom Module Imports
import { BadRequestException } from '../../../../../core-server/src/global/exception/CustomException';
// ** Response Imports

// ** enum, dto, entity, types Imports

var ServiceAccount = require('./fcm-account.json');

@Injectable()
export default class WebPushService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount),
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
}
